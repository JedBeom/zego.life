package main

import (
	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"
	"github.com/labstack/echo"
)

func getCampaign(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	cmp, err := models.CampaignRandomOne(conn)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, cmp)
}

// admin-only for now
func postCampaign(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u := c.Get("user").(models.User)
	p := struct {
		Title, SubTitle, ImageSrc, Link string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	cmp := models.Campaign{
		IsReady:  true,
		Title:    p.Title,
		SubTitle: p.SubTitle,
		ImageSrc: p.ImageSrc,
		Link:     p.Link,
		UserID:   u.ID,
	}
	if err := cmp.Create(conn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.String(200, cmp.ID)
}
