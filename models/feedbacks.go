package models

import (
	"github.com/go-pg/pg"
	"github.com/google/uuid"
)

func (f *Feedback) Create(db *pg.DB) error {
	id, _ := uuid.NewRandom()
	f.ID = id.String()
	return db.Insert(f)
}

func (f *Feedback) Update(db *pg.DB) error {
	_, err := db.Model(f).Column("answer").Update()
	return err
}

func FeedBacksByUser(db *pg.DB, userID string) (fs []Feedback, err error) {
	err = db.Model(&fs).Where("user_id = ?", userID).Order("created_at DESC").Select()
	return
}
