package models

import (
	"github.com/go-pg/pg"
	"github.com/google/uuid"
)

func (f *Feedback) Create(db *pg.Conn) error {
	id, _ := uuid.NewRandom()
	f.ID = id.String()
	return db.Insert(f)
}

func (f *Feedback) Update(db *pg.Conn) error {
	_, err := db.Model(f).Column("answer").WherePK().Update()
	return err
}

func FeedbacksByUser(db *pg.Conn, userID string) (fs []Feedback, err error) {
	err = db.Model(&fs).Where("user_id = ?", userID).Order("created_at DESC").Select()
	return
}

func FeedbackByID(db *pg.Conn, id string) (f Feedback, err error) {
	err = db.Model(&f).Where("id = ?", id).Select()
	return
}

func FeedbacksAll(db *pg.Conn) (fs []Feedback, err error) {
	err = db.Model(&fs).Order("created_at DESC").Relation("User").Select()
	return
}
