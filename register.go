package main

import (
	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/JedBeom/zego.life/parse"
	"github.com/go-pg/pg"
	"github.com/labstack/echo"
)

func postRegister(c echo.Context) error {
	p := struct {
		Email                string
		Password             string
		Grade, Class, Number int
		Name                 string
		Barcode              string
	}{}

	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	u := models.User{
		Grade:    p.Grade,
		Class:    p.Class,
		Number:   p.Number,
		Name:     p.Name,
		Email:    p.Email,
		Password: p.Password,
		Barcode:  p.Barcode,
	}

	if ure := u.ValidateUserRegister(); ure != nil {
		return ure.Send(c)
	}
	if ure := u.CanRegister(db); ure != nil {
		return ure.Send(c)
	}

	if err := u.Create(db); err != nil {
		pgErr, ok := err.(pg.Error)
		if ok && pgErr.Field(models.ErrPgErrCodeField) == models.ErrPgUniqueViolation {
			ure := apierror.UserRegisterError{
				Field:   "hakbun",
				Content: "이미 존재하는 학번입니다.",
			}
			return ure.Send(c)
		}

		return apierror.ErrDBErr.Send(c)
	}

	return c.JSONPretty(200, Map{
		"message": "register successful",
	}, JSONIndent)
}

func getFirstParse(c echo.Context) error {
	email := c.Param("email")
	if email == "" {
		return echo.ErrBadRequest
	}

	u, err := models.UserByEmail(db, email)
	if err != nil {
		return echo.ErrBadRequest
	}

	exists, err := models.Diet2UserUserExists(db, u)
	if err != nil {
		return apierror.ErrDBErr.Send(c)
	}

	if exists {
		return apierror.ErrFirstParse.Send(c)
	}

	if err := parse.GetApplyListOfUser(db, u, models.SettingByKey(db, "d2u_calendar")); err != nil {
		models.LogError(db, u.ID, c.Request().Header.Get(echo.HeaderXRequestID), "getFirstParse():parse.GetApplyListOfUser()", err)
		return apierror.ErrFirstParse.Send(c)
	}

	return c.JSONPretty(200, Map{
		"message": "first parse successful",
	}, JSONIndent)
}
