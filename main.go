package main

import (
	"fmt"
	"log"

	"github.com/JedBeom/zego.life/models"

	"github.com/go-pg/pg"

	"github.com/JedBeom/zego.life/parse"
	_ "github.com/joho/godotenv/autoload"
)

const (
	JSONIndent = "    "
)

type Map map[string]string

var banner = `  __________ ____  ___   _     ___ _____ _____
 |__  / ____/ ___|/ _ \ | |   |_ _|  ___| ____|
   / /|  _|| |  _| | | || |    | || |_  |  _|
  / /_| |__| |_| | |_| || |___ | ||  _| | |___
 /____|_____\____|\___(_)_____|___|_|   |_____|`

var db *pg.DB

func main() {
	db = models.Connect()
	parse.GetDietIfNotExist(db)
	parse.GetSchedulesIfNotExists(db)

	fmt.Println(banner)
	log.Println("始めましょう!")

	crontab()
	run()
}
