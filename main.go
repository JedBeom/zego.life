package main

import (
	"github.com/JedBeom/zego.life/parse"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	connectDB()

	parse.GetDietIfNotExist(db)

	run()
}
