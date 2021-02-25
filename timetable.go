package main

import (
	"strconv"

	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"

	"github.com/labstack/echo"
)

func getTimetableTemplateByGradeClass(c echo.Context) error {
	grade, err := strconv.Atoi(c.Param("grade"))
	if err != nil {
		return echo.ErrBadRequest
	}

	class, err := strconv.Atoi(c.Param("class"))
	if err != nil {
		return echo.ErrBadRequest
	}

	conn := c.Get("conn").(*pg.Conn)
	table, err := models.TimetableTemplateByGradeClass(conn, grade, class)
	if err != nil {
		if err == pg.ErrNoRows {
			return echo.ErrNotFound
		}
		return echo.ErrInternalServerError
	}

	return c.JSON(200, table)
}

func getTimetableMe(c echo.Context) error {
	u := c.Get("user").(models.User)
	conn := c.Get("conn").(*pg.Conn)

	table, err := u.Timetable(conn)
	if err == pg.ErrNoRows {
		return echo.ErrNotFound
	} else if err != nil {
		return err
	}

	return c.JSON(200, table)
}

func postTimetable(c echo.Context) error {
	u := c.Get("user").(models.User)
	conn := c.Get("conn").(*pg.Conn)

	p := struct {
		ReplaceTable map[string]string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	table := models.Timetable{
		UserID:       u.ID,
		ReplaceTable: p.ReplaceTable,
	}

	if err := table.Create(conn); err != nil {
		return err
	}

	return c.NoContent(200)
}

func getTimetableSubjects(c echo.Context) error {
	return c.File("./parse/timetable/subjects.json")
}
