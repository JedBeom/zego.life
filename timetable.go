package main

import (
	"strconv"

	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"

	"github.com/labstack/echo"
)

func getTimetableByGradeClass(c echo.Context) error {
	grade, err := strconv.Atoi(c.Param("grade"))
	if err != nil {
		return echo.ErrBadRequest
	}

	class, err := strconv.Atoi(c.Param("class"))
	if err != nil {
		return echo.ErrBadRequest
	}

	table, err := models.TimetableTemplateByGradeClass(db, grade, class)
	if err != nil {
		if err == pg.ErrNoRows {
			return echo.ErrNotFound
		}
		return echo.ErrInternalServerError
	}

	return c.JSON(200, table)
}
