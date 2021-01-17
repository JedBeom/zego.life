package main

import (
	"log"
	"strings"

	"github.com/go-pg/pg"

	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getFeedbacksAll(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	all, err := models.FeedbacksAll(conn)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, all)
}

func getFeedbacksByUser(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	id := c.Param("user_id")
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	if !strings.Contains(u.Roles, "admin,") && id != u.ID {
		return echo.ErrUnauthorized
	}

	fs, err := models.FeedbacksByUser(conn, id)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, fs)
}

func getFeedbackByID(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	id := c.Param("id")
	f, err := models.FeedbackByID(conn, id)
	if err != nil {
		return echo.ErrNotFound
	}

	return c.JSON(200, f)
}

func postFeedback(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	p := struct {
		Content string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	if p.Content == "" {
		return echo.ErrBadRequest
	}

	f := models.Feedback{
		UserID:  u.ID,
		Content: p.Content,
	}

	if err := f.Create(conn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}

func patchFeedbackByID(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	id := c.Param("id")
	p := models.Feedback{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	if p.ID != id {
		return echo.ErrBadRequest
	}

	if err := p.Update(conn); err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}
