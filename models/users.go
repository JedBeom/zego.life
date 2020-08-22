package models

import (
	"github.com/go-pg/pg"
	"github.com/google/uuid"
)

func UsersAll(db *pg.DB) (us []User, err error) {
	err = db.Model(&us).Order("created_at").Select()
	return
}

func (u *User) Create(db *pg.DB) error {
	id, _ := uuid.NewRandom()
	u.ID = id.String()
	return db.Insert(u)
}
