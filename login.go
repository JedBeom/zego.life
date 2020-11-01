package main

import (
	"time"

	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
	"golang.org/x/crypto/bcrypt"
)

func postLogin(c echo.Context) error {
	p := struct {
		Email    string
		Password string
	}{}
	if err := c.Bind(&p); err != nil {
		time.Sleep(time.Second * 3) // fake wait
		return echo.ErrBadRequest
	}

	u, err := models.UserByEmail(db, p.Email)
	if err != nil {
		time.Sleep(time.Second * 3) // fake wait
		return apierror.ErrLoginFailed.Send(c)
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(p.Password)); err != nil {
		return apierror.ErrLoginFailed.Send(c)
	}

	s, err := u.NewSession(db)
	if err != nil {
		return apierror.ErrLoginFailed.Send(c)
	}

	return c.JSONPretty(200, Map{
		"token": s.ID,
	}, JSONIndent)
}

func getLogout(c echo.Context) error {
	sID, ok := c.Get("s_id").(string)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	s := models.Session{ID: sID}
	err := s.Delete(db)
	if err != nil {
		return apierror.ErrDBErr.Send(c)
	}

	return c.JSONPretty(200, Map{
		"message": "success",
	}, JSONIndent)
}
