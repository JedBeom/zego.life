package main

import (
	"github.com/JedBeom/zego.life/parse"

	"github.com/JedBeom/zego.life/models"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	db := models.Connect()
	err := parse.GetEventsByYearMonth(db, 2020, 2)
	panic(err)
}
