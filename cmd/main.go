package main

import (
	"fmt"
	"time"

	"github.com/JedBeom/zego.life/models"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	db := models.Connect()
	only, err := models.EventsDateOnly(db, time.Now())
	fmt.Println(only, err)
}
