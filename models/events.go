package models

import (
	"fmt"
	"time"

	"github.com/go-pg/pg"
)

func (s *Event) Create(db *pg.Conn) (err error) {
	return db.Insert(s)
}

func EventIDLikeExists(db *pg.Conn, like string) (bool, error) {
	like += "%"
	return db.Model(&Event{}).Where("id like ?", like).Exists()
}

func EventsByMonth(db *pg.Conn, year, month int) (events []Event, err error) {
	yyyymm := fmt.Sprintf("%d-%02d-", year, month)
	start := yyyymm + "01"

	end := yyyymm
	switch month {
	case 1, 3, 5, 7, 8, 10, 12:
		end += "31"
	case 2:
		if year%4 == 0 {
			end += "29"
		} else {
			end += "28"
		}
	default:
		end += "30"
	}

	err = db.Model(&events).Where("date between ? and ?", start, end).Order("date ASC").Select()
	return
}

func EventsByDate(db *pg.Conn, date string) (events []Event, err error) {
	err = db.Model(&events).Where("date = ?", date).Select()
	return
}

func EventsDateOnly(db *pg.Conn, now time.Time) (dates []string, err error) {
	min := now.AddDate(0, -1, 0).Format("2006-01-02")
	max := now.AddDate(0, +1, 0).Format("2006-01-02")
	stmt, err := db.Prepare(fmt.Sprintf(`select date from events where date between '%s' and '%s'`, min, max))
	if err != nil {
		return
	}
	defer stmt.Close()
	_, err = stmt.Query(&dates)
	return
}
