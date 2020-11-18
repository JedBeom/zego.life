package main

import (
	"log"
	"strings"

	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getFeedbacksAll(c echo.Context) error {
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	// admin-only
	if !strings.Contains(u.Roles, "admin,") {
		return echo.ErrUnauthorized
	}

	all, err := models.FeedbacksAll(db)
	if err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(200, all)
}

func getFeedbacksByUser(c echo.Context) error {
	id := c.Param("user_id")
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	if !strings.Contains(u.Roles, "admin,") && id != u.ID {
		return echo.ErrUnauthorized
	}

	fs, err := models.FeedBacksByUser(db, id)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, fs)
}

func postFeedback(c echo.Context) error {
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	p := struct {
		Content string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	if p.Content == "" {
		return echo.ErrBadRequest
	}

	f := models.Feedback{
		UserID:  u.ID,
		Content: p.Content,
	}

	if err := f.Create(db); err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, Map{
		"message": "success",
	})
}
