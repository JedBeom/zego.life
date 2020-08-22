package main

import (
	"github.com/labstack/echo"

	echoMw "github.com/labstack/echo/middleware"
)

func routes(e *echo.Echo) {
	e.Pre(echoMw.RemoveTrailingSlash())
	e.Use(echoMw.CORS())
	e.Use(echoMw.Recover())
	e.Use(echoMw.RequestID())
	e.Use(echoMw.Logger())

	frontPrefix := "front/build"
	e.File("/*", frontPrefix+"/index.html")
	e.File("/favicon.ico", frontPrefix+"/favicon.ico")
	e.Static("/static", frontPrefix+"/static")

	api := e.Group("/api/v1")
	{
		// api.GET("/diets/by-month/:month", getDietsByMonth)
		api.GET("/diets/:date", getDietsByDate)
		api.GET("/users/:user_id/diet2user/:diet_id", GetDiet2UserByDietAndUser)

		// 	api.GET("/events", getEvents)

	}
}
