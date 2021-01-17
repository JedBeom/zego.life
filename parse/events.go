package parse

import (
	"fmt"
	"time"

	sm "github.com/JedBeom/schoolmeal"
	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"
)

func GetEventsByYearMonth(db *pg.Conn, year, month int) (err error) {
	// 1월 2월은 전년도 취급한다는데, sm에서 고처야 할듯.
	sches, err := s.GetMonthSchedule(year, month)
	if err != nil {
		return
	}

	for _, smSche := range sches {
		sche := scheToEvent(smSche)
		if err := sche.Create(db); err != nil {
			return err
		}
	}

	return
}

func scheToEvent(sche sm.Schedule) models.Event {
	event := models.Event{
		ID:         sche.DateString + "-" + sche.Name,
		Name:       sche.Name,
		Date:       sche.Date.Add(24 * time.Hour),
		DateString: sche.DateString,
		Type:       sche.Type,
		Grade1:     sche.Grade1,
		Grade2:     sche.Grade2,
		Grade3:     sche.Grade3,
	}

	return event
}

func GetEventsIfNotExists(db *pg.Conn) {
	t := time.Now()
	like := fmt.Sprintf("%d%02d", t.Year(), t.Month())
	exists, err := models.EventIDLikeExists(db, like)
	if err == nil && exists {
		return
	}

	if err := GetEventsByYearMonth(db, t.Year(), int(t.Month())); err != nil {
		panic(err) // 스타트업에 실행하는 거니까 패닉 정도는 해줘야지.
	}
}
