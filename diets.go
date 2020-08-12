package main

import (
	"github.com/labstack/echo"
)

func getDietsByDate(c echo.Context) error {
	timestamp := c.Param("date")
	if timestamp == "" {
		return echo.ErrBadRequest
	}

}
