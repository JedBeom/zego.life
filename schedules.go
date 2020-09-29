package main

import (
	"time"

	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getSchedules(c echo.Context) error {
	t := time.Now()
	sches, err := models.ScheduleByMonth(db, t.Year(), int(t.Month()))
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSONPretty(200, sches, JSONIndent)
}
