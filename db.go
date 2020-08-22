package main

import (
	"os"

	"github.com/go-pg/pg"
	_ "github.com/joho/godotenv/autoload"
)

var db *pg.DB

func connectDB() {
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	database := os.Getenv("DB_DATABASE")
	db = pg.Connect(&pg.Options{
		User:     user,
		Password: password,
		Database: database,
	})
}
