package main

import (
	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

func getDietReviewPossible(c echo.Context) error {
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	dietID := c.Param("diet_id")
	if dietID == "" {
		return echo.ErrBadRequest
	}

	diet, err := models.DietReviewPossible(db, dietID, u.ID)
	if err != nil {
		return echo.ErrBadRequest
	}
	return c.JSON(200, diet)
}

func postDietReview(c echo.Context) error {
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	dietID := c.Param("diet_id")
	if dietID == "" {
		return echo.ErrBadRequest
	}

	p := struct {
		Rate      int
		BestIndex int
		BestMenu  string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	dr := models.DietReview{
		DietID:    dietID,
		UserID:    u.ID,
		Rate:      p.Rate,
		BestIndex: p.BestIndex,
		BestMenu:  p.BestMenu,
	}

	if err := dr.Create(db); err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, Map{
		"message": "success",
	})
}
