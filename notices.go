package main

import (
	"log"
	"strings"

	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
	"github.com/russross/blackfriday/v2"
)

func getNoticesAll(c echo.Context) error {
	ns, err := models.NoticesAll(db)
	if err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(200, ns)
}

func getLastNoticeTitle(c echo.Context) error {
	last, err := models.NoticeLast(db)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, Map{
		"Title": last.Title,
	})
}

func postNotice(c echo.Context) error {
	// admin only
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	if !strings.Contains(u.Roles, "admin,") {
		return echo.ErrUnauthorized
	}

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

	if err := n.Create(db); err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, Map{
		"message": "success",
	})
}
