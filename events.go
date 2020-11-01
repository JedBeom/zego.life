package main

import (
	"strconv"
	"time"

	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getEvents(c echo.Context) error {
	year, err := strconv.Atoi(c.Param("year"))
	if err != nil || year < 2020 {
		return echo.ErrBadRequest
	}

	month, err := strconv.Atoi(c.Param("month"))
	if err != nil || month < 1 || month > 12 {
		return echo.ErrBadRequest
	}

	events, err := models.EventsByMonth(db, year, month)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSONPretty(200, events, JSONIndent)
}

func getEventsLegacy(c echo.Context) error {
	t := time.Now()

	events, err := models.EventsByMonth(db, t.Year(), int(t.Month()))
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSONPretty(200, events, JSONIndent)
}
