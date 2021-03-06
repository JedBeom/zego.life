package main

import (
	"log"
	"strings"

	"github.com/go-pg/pg"

	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getPwChangeToken(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	if !strings.Contains(u.Roles, "admin,") {
		return echo.ErrForbidden
	}

	targetUserID := c.Param("user_id")
	t := models.Token{
		Type:   1,
		UserID: targetUserID,
	}

	if err := t.Create(conn); err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(200, t)
}

func postPwChange(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	p := struct {
		Password string
		Token    string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	t, err := models.TokenByID(conn, p.Token)
	if err != nil {
		return echo.ErrBadRequest
	}

	if t.Type != 1 {
		return echo.ErrBadRequest
	}

	u, err := models.UserByID(conn, t.UserID)
	if err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	u.Password, err = models.Encrypt(p.Password)
	if err != nil {
		return echo.ErrInternalServerError
	}

	if err := u.UpdatePw(conn); err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	_ = t.Use(conn)

	return c.NoContent(200)
}
