package main

import (
	"net/http"

	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getDietsByDate(c echo.Context) error {
	timestamp := c.Param("date")
	if timestamp == "" {
		return echo.ErrBadRequest
	}

	ds, err := models.DietsByTimestamp(db, timestamp)
	if err != nil || len(ds) == 0 {
		return echo.ErrNotFound
	}

	return c.JSON(http.StatusOK, ds)
}
