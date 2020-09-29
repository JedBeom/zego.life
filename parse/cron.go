package parse

import (
	"time"

	"github.com/go-pg/pg"
	"github.com/robfig/cron/v3"
)

func Cron(c *cron.Cron, db *pg.DB) {
	// every month 28th
	if _, err := c.AddFunc("0 0 28 * *", func() {
		t := time.Now()
		GetMonthDiets(db, t.Year(), int(t.Month()))
	}); err != nil {
		panic(err)
	}
}
