package models

import "github.com/go-pg/pg"

func (a *AccessLog) Create(db *pg.Conn) error {
	return db.Insert(a)
}
