package main

import (
	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

const (
	KeyHeader = "Heartbeat-Overheat"
)

func middlewareTokenCheck(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		key := c.Request().Header.Get(KeyHeader)
		if key == "" {
			return next(c)
		}
		s, err := models.SessionByID(db, key)
		if err != nil || s.User == nil {
			return apierror.ErrInvalidKey.Send(c)
		}

		c.Set("s_id", s.ID)
		c.Set("user", *s.User)

		return next(c)
	}
}

func middlewareUserOnly(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		sID, ok := c.Get("s_id").(string)
		if !ok || sID == "" {
			return echo.ErrUnauthorized
		}

		return next(c)
	}
}

func middlewareLogger(next echo.HandlerFunc) echo.HandlerFunc {
	return func(c echo.Context) error {
		access := models.AccessLog{
			ID:     c.Response().Header().Get(echo.HeaderXRequestID),
			IP:     c.RealIP(),
			Method: c.Request().Method,
			Path:   c.Path(),
		}

		err := next(c)
		if err != nil {
			access.Error = err.Error()
		}
		sID, ok := c.Get("s_id").(string)
		if ok {
			access.SessionID = sID
		}

		if err := access.Create(db); err != nil {
			models.LogError(db, "", access.ID, "middlewareLogger():access.Create()", err)
		}

		return err
	}
}
