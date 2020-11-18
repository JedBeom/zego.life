package models

import (
	"github.com/go-pg/pg"
)

func TimetableTemplateByGradeClass(db *pg.DB, grade, class int) (table TimetableTemplate, err error) {
	err = db.Model(&table).Where("grade = ?", grade).Where("class = ?", class).Select()
	return
}
