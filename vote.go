package main

import (
	"log"

	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"
	"github.com/labstack/echo"
)

func postVote(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	p := struct {
		S1, S2, S3, S4, S5 bool
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	v := models.Vote{
		S1: p.S1,
		S2: p.S2,
		S3: p.S3,
		S4: p.S4,
		S5: p.S5,
	}
	if err := v.Create(conn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}

func getVoteResult(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	all, err := models.VotesCountAll(conn)
	if err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(200, all)
}
