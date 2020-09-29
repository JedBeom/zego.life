package parse

import (
	"fmt"
	"time"

	sm "github.com/JedBeom/schoolmeal"
	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"
)

func GetScheduleByYearMonth(db *pg.DB, year, month int) (err error) {
	// 1월 2월은 전년도 취급한다는데, sm에서 고처야 할듯.
	sches, err := s.GetMonthSchedule(year, month)
	if err != nil {
		return
	}

	for _, smSche := range sches {
		sche := scheToSche(smSche)
		if err := sche.Create(db); err != nil {
			return err
		}
	}

	return
}

func scheToSche(smSche sm.Schedule) models.Schedule {
	mdSche := models.Schedule{
		ID:         smSche.DateString + "-" + smSche.Name,
		Name:       smSche.Name,
		Date:       smSche.Date,
		DateString: smSche.DateString,
		Type:       smSche.Type,
		Grade1:     smSche.Grade1,
		Grade2:     smSche.Grade2,
		Grade3:     smSche.Grade3,
	}

	return mdSche
}

func GetSchedulesIfNotExists(db *pg.DB) {
	t := time.Now()
	like := fmt.Sprintf("%d%02d", t.Year(), t.Month())
	exists, err := models.ScheduleIDLikeExists(db, like)
	if err == nil && exists {
		return
	}

	if err := GetScheduleByYearMonth(db, t.Year(), int(t.Month())); err != nil {
		panic(err) // 스타트업에 실행하는 거니까 패닉 정도는 해줘야지.
	}
}
