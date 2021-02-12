package models

import (
	"time"

	"github.com/go-pg/pg"
)

func DDayEventAll(db *pg.Conn) (de []DDayEvent, err error) {
	err = db.Model(&de).Order("date").Select()
	return
}

func DDayEventByGrade(db *pg.Conn, grade int) (de []DDayEvent, err error) {
	err = db.Model(&de).
		Where("target = -1").WhereOr("target = ?", grade).
		Order("date").
		Where("date >= ?", time.Now()).
		Select()
	return
}

func (de *DDayEvent) Create(db *pg.Conn) error {
	return db.Insert(de)
}
