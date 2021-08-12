package models

import (
	"github.com/go-pg/pg"
)

func ClassTimetableByGradeClass(db *pg.Conn, grade, class int) (table ClassTimetable, err error) {
	err = db.Model(&table).Where("grade = ?", grade).Where("class = ?", class).Select()
	return
}

func (u User) ElectiveSubjects(db *pg.Conn) (est ElectiveSubjectsToUser, err error) {
	err = db.Model(&est).Where("user_id = ?", u.ID).Select()
	return
}

func (t *ElectiveSubjectsToUser) Delete(db *pg.Conn) error {
	_, err := db.Model(t).Where("user_id = ?", t.UserID).Delete()
	return err
}

func (t *ElectiveSubjectsToUser) Create(db *pg.Conn) error {
	return db.Insert(t)
}
