package models

import (
	"github.com/go-pg/pg"
)

func (du *Diet2User) Create(db *pg.DB) (err error) {
	return db.Insert(du)
}

func Diet2UserByDietAndUser(db *pg.DB, dietID, userID string) (du Diet2User, err error) {
	err = db.Model(&du).
		Where("diet_id = ?", dietID).
		Where("user_id = ?", userID).Select()
	return
}
