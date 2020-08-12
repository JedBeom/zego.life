package main

import (
	"context"
	"github.com/labstack/echo"
	"os"
	"os/signal"
	"time"
)

func run() {
	e := echo.New()
	e.HideBanner = true

	routes(e)

	go func() {
		e.Logger.Fatal(e.Start(os.Getenv("PORT")))
	}()

	// Wait for interrupt signal to gracefully shutdown the server with
	// a timeout of 10 seconds.
	quit := make(chan os.Signal)
	signal.Notify(quit, os.Interrupt)
	<-quit
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()
	if err := e.Shutdown(ctx); err != nil {
		e.Logger.Fatal(err)
	}
}