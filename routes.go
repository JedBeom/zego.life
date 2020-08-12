package main

import (
	"fmt"
	"github.com/labstack/echo"

	echoMw "github.com/labstack/echo/middleware"
)

func routes(e *echo.Echo) {
	e.Pre(echoMw.RemoveTrailingSlash())
	e.Use(echoMw.CORS())
	e.Use(echoMw.Recover())
	e.Use(echoMw.RequestID())

	api := e.Group("/api/v1/")
	{
		// api.GET("/diets/by-month/:month", getDietsByMonth)
		api.GET("/diets/:date", getDietsByDate)

	// 	api.GET("/events", getEvents)

	}
}
