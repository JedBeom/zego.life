package main

import (
	"fmt"

	"github.com/JedBeom/zego.life/models"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	db := models.Connect()
	us, err := models.UsersAllOptions(db, "created_at DESC", 50, 1)
	if err != nil {
		panic(err)
	}

	fmt.Println(us)
}
