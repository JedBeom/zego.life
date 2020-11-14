package models

import (
	"time"

	"github.com/lithammer/shortuuid/v3"

	"github.com/go-pg/pg"
)

func (t *Token) Create(db *pg.DB) error {
	t.ID = shortuuid.New()
	return db.Insert(t)
}

func (t *Token) Use(db *pg.DB) error {
	t.UsedAt = time.Now()
	_, err := db.Model(t).WherePK().Column("used_at").Update()
	return err
}

func TokenByID(db *pg.DB, id string) (t Token, err error) {
	err = db.Model(&t).Where("id = ?", id).Where("used_at is null").Select()
	return
}
