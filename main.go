package main

import (
	"fmt"
	"log"

	"github.com/JedBeom/zego.life/media"

	"github.com/JedBeom/zego.life/models"

	"github.com/go-pg/pg"

	_ "github.com/joho/godotenv/autoload"
)

type Map map[string]interface{}

var banner = `  __________ ____  ___   _     ___ _____ _____
 |__  / ____/ ___|/ _ \ | |   |_ _|  ___| ____|
   / /|  _|| |  _| | | || |    | || |_  |  _|
  / /_| |__| |_| | |_| || |___ | ||  _| | |___
 /____|_____\____|\___(_)_____|___|_|   |_____|`

var db *pg.DB

func main() {
	media.ConnectAWS()
	db = models.Connect()
	conn := db.Conn()
	// parse.GetDietIfNotExist(conn)
	// parse.GetEventsIfNotExists(conn)
	conn.Close()

	fmt.Println(banner)
	log.Println("始めましょう!")

	crontab()
	run()
}
