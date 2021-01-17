package models

import (
	"time"

	"github.com/go-pg/pg"
)

func DDayEventByGrade(db *pg.Conn, grade int) (de DDayEvent, err error) {
	err = db.Model(&de).
		Where("grade = -1").WhereOr("grade = ?", grade).
		Order("date").
		Where("date >= ?", time.Now().Format("2006-01-02")).
		First()
	return
}

func (de *DDayEvent) Create(db *pg.Conn) error {
	return db.Insert(de)
}
