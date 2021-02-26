package main

import (
	"log"
	"strconv"
	"strings"

	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/JedBeom/zego.life/parse"
	"github.com/go-pg/pg"
	"github.com/labstack/echo"
)

func getRegisterAvailable(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	return c.String(200, models.SettingByKey(conn, "register_available"))
}

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

	conn := c.Get("conn").(*pg.Conn)

	if ure := u.ValidateUserRegister(); ure != nil {
		return ure.Send(c)
	}
	if ure := u.CanRegister(conn); ure != nil {
		return ure.Send(c)
	}

	var err error
	u.EnterYear, err = strconv.Atoi(u.Email[3:5])
	if err != nil {
		return apierror.ApiError{
			StatusCode: 400,
			ErrorCode:  -18,
			Message:    "이메일을 다시 확인해주세요.",
		}
	}

	if err := u.Create(conn); err != nil {
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

	return c.NoContent(200)
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
	conn := c.Get("conn").(*pg.Conn)
	email := c.Param("email")
	if email == "" {
		return echo.ErrBadRequest
	}

	u, err := models.UserByEmail(conn, email)
	if err != nil {
		return echo.ErrBadRequest
	}

	exists, err := models.Diet2UserUserExists(conn, u)
	if err != nil {
		return apierror.ErrDBErr.Send(c)
	}

	if exists {
		return apierror.ErrFirstParse.Send(c)
	}

	calendars := strings.Split(models.SettingByKey(conn, "d2u_calendar"), ",")
	for _, cal := range calendars {
		if err := parse.GetApplyListOfUser(conn, u, cal); err != nil {
			log.Println(err)
			models.LogError(conn, u.ID, c.Request().Header.Get(echo.HeaderXRequestID), "getFirstParse():parse.GetApplyListOfUser()", err)
			return apierror.ErrFirstParse.Send(c)
		}
	}

	return c.NoContent(200)
}
