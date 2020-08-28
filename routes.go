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
	e.Use(middlewareLogger)

	front := "front/build"
	e.File("/*", front+"/index.html")
	e.Static("/static", front+"/static")

	api := e.Group("/api/v1", middlewareTokenCheck)
	{
		u := api.Group("", middlewareUserOnly)
		{
			u.GET("/me", getMe)
			u.GET("/logout", getLogout)
			u.GET("/users/:user_id/diet2user/:diet_id", GetDiet2UserByDietAndUser)
		}

		api.POST("/register", postRegister)
		api.GET("/first-parse/:email", getFirstParse)
		api.POST("/login", postLogin)

		// api.GET("/diets/by-month/:month", getDietsByMonth)
		api.GET("/diets/:date", getDietsByDate)

		// 	api.GET("/events", getEvents)

	}
}
