package main

import (
	"strconv"
	"time"

	"github.com/go-pg/pg"

	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getEventsByYearMonth(c echo.Context) error {
	year, err := strconv.Atoi(c.Param("year"))
	if err != nil || year < 2020 {
		return echo.ErrBadRequest
	}

	month, err := strconv.Atoi(c.Param("month"))
	if err != nil || month < 1 || month > 12 {
		return echo.ErrBadRequest
	}

	conn := c.Get("conn").(*pg.Conn)
	events, err := models.EventsByMonth(conn, year, month)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, events)
}

func getEventsByDate(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)

	date := c.Param("date")
	events, err := models.EventsByDate(conn, date)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, events)
}

func getEventsDateOnly(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	dates, err := models.EventsDateOnly(conn, time.Now())
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, dates)
}
