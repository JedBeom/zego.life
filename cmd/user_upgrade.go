package main

import (
	"log"

	"github.com/JedBeom/zego.life/models"
	_ "github.com/joho/godotenv/autoload"
)

func userUpgrade() {
	db := models.Connect()
	conn := db.Conn()
	us, err := models.UsersAll(conn)
	if err != nil {
		log.Fatal(err)
	}
	for i := range us {
		uu := models.UserUpgrade{}
		us[i].EnterYear = 21 - us[i].Grade
		if err := conn.Model(&uu).Where("id = ?", us[i].ID).Select(); err != nil {
			log.Println(us[i].ID, err)
		} else {
			us[i].Grade = uu.Grade
			us[i].Class = uu.Class
			us[i].Number = uu.Number
		}

		if _, err := conn.Model(&us[i]).WherePK().Update(); err != nil {
			log.Println(us[i].ID, err)
		} else {
			log.Println(us[i].ID, "COMPLETE")
		}
	}
}
