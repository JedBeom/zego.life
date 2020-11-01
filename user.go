package main

import (
	"strings"
	"time"

	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getMe(c echo.Context) error {
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	return c.JSONPretty(200, u, JSONIndent)
}

func patchUser(c echo.Context) error {
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	userID := c.Param("user_id")

	if userID != u.ID && !strings.Contains(u.Roles, "admin,") {
		return echo.ErrUnauthorized
	}

	p := struct {
		IsMale        bool
		IsDorm        bool
		BirthdayYear  int
		BirthdayMonth int
		BirthdayDay   int
	}{}

	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	if p.IsMale {
		u.Sex = 1
	} else {
		u.Sex = 2
	}

	if p.IsDorm {
		u.Residence = 1
	} else {
		u.Residence = 2
	}

	u.BirthYear = p.BirthdayYear
	u.BirthMonth = p.BirthdayMonth
	u.BirthDay = p.BirthdayDay

	u.UpdatedAt = time.Now()
	if err := u.UpdateV1(db); err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, Map{
		"message": "success",
	})
}
