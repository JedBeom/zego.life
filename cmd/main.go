package main

import (
	"fmt"

	"github.com/JedBeom/zego.life/models"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	db := models.Connect()
	us, err := models.UsersLikeName(db, "범준환")
	if err != nil {
		panic(err)
	}
	fmt.Println(models.TokenByID(db, us[0].ID))
}
