package models

import (
	"fmt"

	"github.com/go-pg/pg"
)

func (s *Schedule) Create(db *pg.DB) (err error) {
	return db.Insert(s)
}

func ScheduleIDLikeExists(db *pg.DB, like string) (bool, error) {
	return db.Model(&Schedule{}).Where("id like ?", like).Exists()
}

func ScheduleByMonth(db *pg.DB, year, month int) (sches []Schedule, err error) {
	yyyymm := fmt.Sprintf("%d-%02d-", year, month)
	start := yyyymm + "01"

	end := yyyymm
	switch month {
	case 1, 3, 5, 7, 8, 10, 12:
		end += "31"
	case 2:
	default:
		end += "30"
	}

	if month == 2 && (year%4 == 0) {
		end += "29"
	} else if month == 2 {
		end += "28"
	}

	err = db.Model(&sches).Where("date between ? and ?", start, end).Order("date ASC").Select()
	return
}
