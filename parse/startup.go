package parse

import (
	"fmt"
	"log"
	"time"

	sm "github.com/JedBeom/schoolmeal"
	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"
)

func GetDietIfNotExist(db *pg.DB) {
	t := time.Now()

	// check today
	exists, err := models.DietByIDExists(db, fmt.Sprintf("%s-%d", sm.Timestamp(t), sm.Lunch))
	if exists && err == nil {
		log.Println("Diet Exists")
		return
	}

	GetMonthDiets(db, t.Year(), int(t.Month()))
}
