package main

import (
	"fmt"

	"github.com/JedBeom/zego.life/parse"

	"github.com/JedBeom/zego.life/models"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	fmt.Println(parse.GetEventsByYearMonth(models.Connect(), 2020, 10))
}
