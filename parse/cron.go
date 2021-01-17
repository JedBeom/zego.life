package parse

import (
	"time"

	"github.com/JedBeom/zego.life/models"

	"github.com/go-pg/pg"
	"github.com/robfig/cron/v3"
)

func Cron(c *cron.Cron, db *pg.Conn) {
	// every month 28th
	if _, err := c.AddFunc("0 0 28 * *", func() {
		t := time.Now().AddDate(0, 1, 0)
		GetMonthDiets(db, t.Year(), int(t.Month()))
	}); err != nil {
		panic(err)
	}

	if _, err := c.AddFunc("0 0 28 * *", func() {
		t := time.Now().AddDate(0, 2, 0)
		if err := GetEventsByYearMonth(db, t.Year(), int(t.Month())); err != nil {
			models.LogError(db, "", "", "Cron:GetEventsByYearMonth", err)
		}
	}); err != nil {
		panic(err)
	}
}
