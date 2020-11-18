package main

import (
	"fmt"

	"github.com/JedBeom/zego.life/models"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	db := models.Connect()
	/*
		t := models.Timetable{
			UserID: "hi",
			Lessons: [][]models.Lesson{
				{{Subject: "ih"}, {Subject: "2"}}, {{Subject: "3"}},
			},
			CreatedAt: time.Time{},
			UpdatedAt: time.Time{},
		}
		fmt.Println(db.Insert(&t))
	*/
	t := models.Timetable{}
	err := db.Model(&t).Where("user_id = ?", "hi").Select()
	fmt.Println(t, err)
}
