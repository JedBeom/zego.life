package main

import (
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func GetDiet2UserByDietAndUser(c echo.Context) error {
	// TODO: 유저가 자기 정보만 GET 하도록
	userID := c.Param("user_id")
	dietID := c.Param("diet_id")

	d2u, err := models.Diet2UserByDietAndUser(db, dietID, userID)
	if err != nil {
		// TODO: 세분화된 에러
		return echo.ErrNotFound
	}
	return c.JSON(200, d2u)
}
