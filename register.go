package main

import (
	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
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
				Field:   "gcn",
				Content: "학번을 다시 한번 확인해주세요. 이미 존재하는 학번입니다.",
			}
			return ure.Send(c)
		}

		return apierror.ErrDBErr.Send(c)
	}

	return c.JSONPretty(200, Map{
		"message": "register successful",
	}, JSONIndent)
}
