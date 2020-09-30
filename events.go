package main

import (
	"time"

	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getEvents(c echo.Context) error {
	t := time.Now()
	events, err := models.EventsByMonth(db, t.Year(), int(t.Month()))
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSONPretty(200, events, JSONIndent)
}
