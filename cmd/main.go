package main

import (
	"fmt"

	"github.com/JedBeom/zego.life/parse"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	fmt.Println(parse.TossButton("개발개발", 15000))
}
