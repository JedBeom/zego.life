package main

import (
	"fmt"
	"log"
	"strconv"
	"time"

	"github.com/go-pg/pg"

	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getDDayEventAll(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	de, err := models.DDayEventAll(conn)
	if err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(200, de)
}

func getDDayEventByGrade(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	grade, err := strconv.Atoi(c.Param("grade"))
	if err != nil {
		return echo.ErrBadRequest
	}

	de, err := models.DDayEventByGrade(conn, grade)
	if err != nil {
		return echo.ErrNotFound
	}

	return c.JSON(200, de)
}

func postDDayEvent(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	p := struct {
		Name   string
		Date   time.Time
		Target int
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	de := models.DDayEvent{
		ID:     fmt.Sprintf("%d-%02d-%02d-%s", p.Date.Year(), int(p.Date.Month()), p.Date.Day(), p.Name),
		Name:   p.Name,
		Date:   p.Date,
		Target: p.Target,
	}

	if err := de.Create(conn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}
