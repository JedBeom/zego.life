package main

import (
	"net/http"

	"github.com/go-pg/pg"

	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getDietsByDate(c echo.Context) error {
	timestamp := c.Param("date")
	if timestamp == "" {
		return echo.ErrBadRequest
	}

	conn := c.Get("conn").(*pg.Conn)
	ds, err := models.DietsByTimestamp(conn, timestamp)
	if err != nil || len(ds) == 0 {
		return echo.ErrNotFound
	}

	return c.JSON(http.StatusOK, ds)
}
