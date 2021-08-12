package main

import (
	"strconv"

	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"

	"github.com/labstack/echo"
)

func getClassTimetable(c echo.Context) error {
	grade, err := strconv.Atoi(c.Param("grade"))
	if err != nil {
		return echo.ErrBadRequest
	}

	class, err := strconv.Atoi(c.Param("class"))
	if err != nil {
		return echo.ErrBadRequest
	}

	conn := c.Get("conn").(*pg.Conn)
	table, err := models.ClassTimetableByGradeClass(conn, grade, class)
	if err != nil {
		if err == pg.ErrNoRows {
			return echo.ErrNotFound
		}
		return echo.ErrInternalServerError
	}

	return c.JSON(200, table)
}

func getElectiveSubjects(c echo.Context) error {
	u := c.Get("user").(models.User)
	conn := c.Get("conn").(*pg.Conn)

	table, err := u.ElectiveSubjects(conn)
	if err == pg.ErrNoRows {
		return echo.ErrNotFound
	} else if err != nil {
		return err
	}

	return c.JSON(200, table)
}

// TODO: EDIT & TEST
func postElectiveSubjects(c echo.Context) error {
	u := c.Get("user").(models.User)
	conn := c.Get("conn").(*pg.Conn)

	p := make(map[string]int)
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	table := models.ElectiveSubjectsToUser{
		UserID:             u.ID,
		ElectiveSubjectIDs: p,
	}

	if err := table.Create(conn); err != nil {
		return err
	}

	return c.NoContent(200)
}

func deleteElectiveSubjectsMe(c echo.Context) error {
	u := c.Get("user").(models.User)
	conn := c.Get("conn").(*pg.Conn)

	tt, err := u.ElectiveSubjects(conn)
	if err != nil {
		return err
	}

	if err := tt.Delete(conn); err != nil {
		return err
	}

	return c.NoContent(200)
}

func getTimetableSubjects(c echo.Context) error {
	return c.File("parse/timetable/2021-2/subjects.json")
}
