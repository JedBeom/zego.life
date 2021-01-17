package main

import (
	"log"

	"github.com/go-pg/pg"

	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
	"github.com/russross/blackfriday/v2"
)

func getNoticesAll(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	ns, err := models.NoticesAll(conn, 5)
	if err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(200, ns)
}

func getLastNoticeTitle(c echo.Context) error {
	con := db.Conn()
	defer con.Close()
	last, err := models.NoticeLast(con)
	if err != nil {
		if err == pg.ErrNoRows {
			return c.JSON(200, Map{"Title": "공지 없음"})
		}
		return echo.ErrInternalServerError
	}

	u := c.Get("user").(models.User)

	return c.JSON(200, Map{
		"Title": last.Title,
		"Roles": u.Roles,
	})
}

func getNoticeByID(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	id := c.Param("id")
	if id == "" {
		return echo.ErrBadRequest
	}

	n, err := models.NoticeByID(conn, id)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, n)
}

func postNotice(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)

	p := struct {
		Title   string
		Content string
		Author  string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	n := models.Notice{
		Title:   p.Title,
		Content: p.Content,
		Author:  p.Author,
	}

	n.ContentHTML = string(blackfriday.Run([]byte(n.Content), blackfriday.WithNoExtensions()))

	if err := n.Create(conn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}

func patchNoticeByID(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	id := c.Param("id")
	if id == "" {
		return echo.ErrBadRequest
	}

	p := struct {
		Title   string
		Author  string
		Content string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	n, err := models.NoticeByID(conn, id)
	if err != nil {
		return echo.ErrInternalServerError
	}

	n.Title = p.Title
	n.Author = p.Author
	n.Content = p.Content
	n.ContentHTML = string(blackfriday.Run([]byte(n.Content), blackfriday.WithNoExtensions()))

	if err := n.Update(conn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}
