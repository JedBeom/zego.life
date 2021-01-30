package main

import (
	"log"

	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"
	"github.com/labstack/echo"
)

func getHome(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	last, err := models.NoticeLast(conn)
	if err != nil {
		if err == pg.ErrNoRows {
			return c.JSON(200, Map{"Title": "공지 없음"})
		}
		return echo.ErrInternalServerError
	}

	u, ok := c.Get("user").(models.User)
	if !ok {
		u.Roles = ""
	}

	cmp, err := models.CampaignRandomOne(conn)
	if err != nil {
		log.Println(err)
		// default on error
		cmp.Title = "제고생활은 제고라이프로"
		cmp.SubTitle = "다음 업데이트를 기대하세요!"
	}

	return c.JSON(200, Map{
		"NoticeTitle": last.Title,
		"Roles":       u.Roles,
		"Campaign":    cmp,
	})
}
