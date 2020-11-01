package main

import (
	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getDiet2UserByDietAndUser(c echo.Context) error {
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	userID := c.Param("user_id")
	dietID := c.Param("diet_id")

	if userID != u.ID {
		return echo.ErrForbidden
	}

	d2u, err := models.Diet2UserByDietAndUser(db, dietID, userID)
	if err != nil {
		// TODO: 세분화된 에러
		return echo.ErrNotFound
	}

	c.Request().Header.Set("Cache-Control", "max-age=43200")
	return c.JSON(200, d2u)
}
