package models

import (
	"os"

	"github.com/go-pg/pg"

	_ "github.com/joho/godotenv/autoload"
)

func Connect() *pg.DB {
	user := os.Getenv("DB_USER")
	password := os.Getenv("DB_PASSWORD")
	database := os.Getenv("DB_DATABASE")
	return pg.Connect(&pg.Options{
		User:     user,
		Password: password,
		Database: database,
	})
}
