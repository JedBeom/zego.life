package main

import (
	"context"
	"os"
	"os/signal"
	"time"

	"github.com/labstack/echo"
)

func run() {
	e := echo.New()
	e.HideBanner = true

	routes(e)

	sslMode := os.Getenv("SSL_MODE")

	go func() {
		if sslMode == "MANUAL" {
			e.Logger.Fatal(e.StartTLS(":443", os.Getenv("SSL_CRT"), os.Getenv("SSL_PRI")))
		} else {
			e.Logger.Fatal(e.Start(os.Getenv("PORT")))
		}
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
