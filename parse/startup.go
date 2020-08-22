package parse

import (
	"fmt"
	"time"

	sm "github.com/JedBeom/schoolmeal"
	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"
)

func GetDietIfNotExist(db *pg.DB) {
	t := time.Now()

	// check today
	exists, err := models.DietByIDExists(db, fmt.Sprintf("%s-%d", sm.Timestamp(t), sm.Lunch))
	if exists || err == nil {
		return
	}

	GetMonthDiets(db, t.Year(), int(t.Month()))
}
