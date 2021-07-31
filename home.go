package main

import (
	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"
	"github.com/labstack/echo"
)

func getHome(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	last, err := models.NoticeLast(conn)
	if err != nil {
		if err != pg.ErrNoRows {
			return echo.ErrInternalServerError
		}

		last.Title = "공지 없음"
	}

	u, ok := c.Get("user").(models.User)
	if !ok {
		u.Roles = ""
	}

	cmp, err := models.CampaignRandomOne(conn)
	cmpp := &cmp
	if err != nil {
		cmpp = nil
	}

	return c.JSON(200, Map{
		"NoticeID": last.ID,
		"Campaign": cmpp,
		"User":     u,
	})
}
