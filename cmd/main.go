package main

import (
	"github.com/JedBeom/zego.life/models"
	"github.com/JedBeom/zego.life/parse"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	db := models.Connect()
	conn := db.Conn()
	parse.GetApplyListOfAllUsersCMD(conn, "D00039")
}
