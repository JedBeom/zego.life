package models

import (
	"github.com/go-pg/pg"
)

func (du *Diet2User) Create(db *pg.Conn) (err error) {
	return db.Insert(du)
}

func Diet2UserByDietAndUser(db *pg.Conn, dietID, userID string) (du Diet2User, err error) {
	err = db.Model(&du).
		Where("diet_id = ?", dietID).
		Where("user_id = ?", userID).Select()
	return
}

func Diet2UserUserExists(db *pg.Conn, u User) (bool, error) {
	return db.Model(&Diet2User{}).Where("user_id = ?", u.ID).Exists()
}

func Diet2UserUpdate(db *pg.Conn, dietID, userID string, applied bool) error {
	_, err := db.Model(&Diet2User{Applied: applied}).Where("diet_id = ?", dietID).
		Where("user_id = ?", userID).Column("applied").Update()
	return err
}
