package main

import (
	"log"
	"strings"

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
		Barcode              string `json:",omitempty"`
		KitchenMemCode       string `json:",omitempty"`

		BirthdayYear  int
		BirthdayMonth int
		BirthdayDay   int

		IsDorm bool
		IsMale bool
	}{}

	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	if p.KitchenMemCode == "" && p.Barcode == "" {
		return echo.ErrBadRequest
	}

	u := models.User{
		Grade:          p.Grade,
		Class:          p.Class,
		Number:         p.Number,
		Name:           p.Name,
		Email:          p.Email,
		Password:       p.Password,
		Barcode:        p.Barcode,
		KitchenMemCode: p.KitchenMemCode,

		BirthYear:  p.BirthdayYear,
		BirthMonth: p.BirthdayMonth,
		BirthDay:   p.BirthdayDay,

		Residence: 1,
		Sex:       1,
	}

	if !p.IsDorm {
		u.Residence = 2 // 광양
	}

	if !p.IsMale {
		u.Sex = 2 // 여자
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

func postKitchenLogin(c echo.Context) error {
	p := struct {
		Grade, Class, Number int
		Password             string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	code, err := parse.GetMemCode(p.Grade, p.Class, p.Number, p.Password)
	if code == "" || err != nil {
		return echo.ErrNotFound
	}

	return c.JSON(200, Map{"Code": code})
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

	calendars := strings.Split(models.SettingByKey(db, "d2u_calendar"), ",")
	for _, cal := range calendars {
		if err := parse.GetApplyListOfUser(db, u, cal); err != nil {
			log.Println(err)
			models.LogError(db, u.ID, c.Request().Header.Get(echo.HeaderXRequestID), "getFirstParse():parse.GetApplyListOfUser()", err)
			return apierror.ErrFirstParse.Send(c)
		}
	}

	return c.JSONPretty(200, Map{
		"message": "first parse successful",
	}, JSONIndent)
}
