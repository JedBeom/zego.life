package models

import (
	"github.com/go-pg/pg"
)

func TimetableTemplateByGradeClass(db *pg.Conn, grade, class int) (table TimetableTemplate, err error) {
	err = db.Model(&table).Where("grade = ?", grade).Where("class = ?", class).Select()
	return
}

func (u User) Timetable(db *pg.Conn) (table Timetable, err error) {
	err = db.Model(&table).Where("user_id = ?", u.ID).Select()
	return
}

func (t *Timetable) Delete(db *pg.Conn) error {
	_, err := db.Model(t).Where("user_id = ?", t.UserID).Delete()
	return err
}

func (t *Timetable) Create(db *pg.Conn) error {
	return db.Insert(t)
}
