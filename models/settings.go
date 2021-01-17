package models

import (
	"github.com/go-pg/pg"
)

func SettingByKey(db *pg.Conn, key string) string {
	s := Setting{}
	_ = db.Model(&s).Where("key = ?", key).Select()
	return s.Value
}
