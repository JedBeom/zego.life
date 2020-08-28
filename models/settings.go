package models

import "github.com/go-pg/pg"

func SettingByKey(db *pg.DB, key string) string {
	s := &Setting{
		Key: key,
	}
	_ = db.Model(s).WherePK().Select()
	return s.Value
}
