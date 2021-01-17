package models

import (
	"github.com/go-pg/pg"
	"github.com/google/uuid"
)

func (u User) NewSession(db *pg.Conn) (s Session, err error) {
	s.UserID = u.ID
	s.ID = uuid.New().String()
	err = db.Insert(&s)
	return
}

func SessionByID(db *pg.Conn, id string) (s Session, err error) {
	err = db.Model(&s).Where("id = ?", id).Select()
	if err != nil {
		return
	}

	u, err := UserByID(db, s.UserID)
	s.User = &u
	return
}

func (s *Session) Delete(db *pg.Conn) (err error) {
	_, err = db.Model(s).WherePK().Delete()
	return
}
