package main

import (
	"github.com/JedBeom/zego.life/parse"

	"github.com/JedBeom/zego.life/models"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	parse.GetApplyListOfAllUsers(models.Connect(), 2020, 11)
}
