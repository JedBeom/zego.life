package main

import (
	"strings"

	"github.com/go-pg/pg"

	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func postRadioStory(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	p := struct {
		Content          string
		SongRequest      string
		Guest, Anonymous bool
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	rs := models.RadioStory{
		UserID:      u.ID,
		Content:     p.Content,
		SongRequest: p.SongRequest,
		Guest:       p.Guest,
		Anonymous:   p.Anonymous,
	}

	if err := rs.Create(conn); err != nil {
		models.LogError(conn, u.ID, "", "postRadioStory", err)
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}

func getRadioStoriesAll(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	// 401 if not admin and not radio
	if !strings.Contains(u.Roles, "radio,") && !strings.Contains(u.Roles, "admin,") {
		return echo.ErrUnauthorized
	}

	rss, err := models.RadioStoriesAll(conn, 20)
	if err != nil {
		models.LogError(conn, u.ID, "", "getRadioStoriesAll", err)
		return echo.ErrInternalServerError
	}

	return c.JSON(200, rss)
}
