package main

import (
	"log"
	"strings"

	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"
	"github.com/labstack/echo"
)

func postComment(c echo.Context) error {
	p := struct {
		Content string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	p.Content = strings.TrimLeft(p.Content, "\t\n")
	p.Content = strings.TrimRight(p.Content, "\t\n")

	if len(p.Content) < 3 {
		return echo.ErrBadRequest
	}

	id := c.Param("id")
	u := c.Get("user").(models.User)
	conn := c.Get("conn").(*pg.Conn)

	t, err := models.ThreadByID(conn, id)
	if err != nil {
		return echo.ErrNotFound
	}

	cm := models.Comment{
		Num:      t.CommentsNum + 1,
		ThreadID: id,
		UserID:   u.ID,
		Visible:  true,
		Content:  p.Content,
	}

	if err := conn.RunInTransaction(func(tx *pg.Tx) error {
		if err := cm.CreateTx(tx); err != nil {
			return err
		}

		return t.IncrementCommentsNumTx(tx)
	}); err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}
