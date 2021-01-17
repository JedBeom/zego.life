package main

import (
	"time"

	"github.com/go-pg/pg"

	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
	"golang.org/x/crypto/bcrypt"
)

func postLogin(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	p := struct {
		Email    string
		Password string
	}{}
	if err := c.Bind(&p); err != nil {
		time.Sleep(time.Second * 3) // fake wait
		return echo.ErrBadRequest
	}

	u, err := models.UserByEmail(conn, p.Email)
	if err != nil {
		time.Sleep(time.Second * 3) // fake wait
		return apierror.ErrLoginFailed.Send(c)
	}

	if err := bcrypt.CompareHashAndPassword([]byte(u.Password), []byte(p.Password)); err != nil {
		return apierror.ErrLoginFailed.Send(c)
	}

	s, err := u.NewSession(conn)
	if err != nil {
		return apierror.ErrLoginFailed.Send(c)
	}

	return c.JSON(200, Map{
		"token": s.ID,
	})
}

func getLogout(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	sID, ok := c.Get("s_id").(string)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	s := models.Session{ID: sID}
	err := s.Delete(conn)
	if err != nil {
		return apierror.ErrDBErr.Send(c)
	}

	return c.NoContent(200)
}
