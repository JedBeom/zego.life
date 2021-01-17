package main

import (
	"log"
	"strconv"
	"time"

	"github.com/lithammer/shortuuid/v3"

	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"
	"github.com/labstack/echo"
)

func getThreads(c echo.Context) error {
	limit, err := strconv.Atoi(c.QueryParam("limit"))
	if err != nil || limit > 100 {
		limit = 50 // default
	}
	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil || page <= 0 {
		page = 1 // default
	}

	conn := c.Get("conn").(*pg.Conn)
	ts, count, err := models.ThreadsAll(conn, limit, page)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, Map{
		"Threads": ts,
		"Count":   count,
	})
}

func postThread(c echo.Context) error {
	p := struct {
		Title   string
		Content string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	u := c.Get("user").(models.User)
	conn := c.Get("conn").(*pg.Conn)
	t := models.Thread{
		ID:         shortuuid.New(),
		OpenUserID: u.ID,
		Title:      p.Title,
		Visible:    true,
		UpdatedAt:  time.Now(),
	}

	cm := models.Comment{
		ID:       shortuuid.New(),
		Num:      1,
		ThreadID: t.ID,
		UserID:   u.ID,
		Visible:  true,
		Content:  p.Content,
	}

	err := conn.RunInTransaction(func(tx *pg.Tx) error {
		err := t.CreateTx(tx)
		if err != nil {
			return err
		}

		if err := cm.CreateTx(tx); err != nil {
			return err
		}

		return t.IncrementCommentsNumTx(tx)
	})

	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.String(200, t.ID)
}

func getThreadByID(c echo.Context) error {
	id := c.Param("id")
	conn := c.Get("conn").(*pg.Conn)

	t, err := models.ThreadByID(conn, id)
	if err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(200, t)
}
