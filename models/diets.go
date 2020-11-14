package models

import (
	"github.com/go-pg/pg"
)

func (d *Diet) Create(db *pg.DB) error {
	return db.Insert(d)
}

func (d *Diet) Update(db *pg.DB) error {
	_, err := db.Model(d).WherePK().Column("content").Update()
	return err
}

func DietByID(db *pg.DB, id string) (d Diet, err error) {
	err = db.Model(&d).Where("id = ?", id).Select()
	return
}

func DietByIDExists(db *pg.DB, id string) (bool, error) {
	return db.Model(&Diet{}).Where("id = ?", id).Exists()
}

func DietsByTimestamp(db *pg.DB, ts string) (ds []Diet, err error) {
	ts = ts + "%"
	err = db.Model(&ds).Where("timestamp LIKE ?", ts).Order("type").Select()
	for i := range ds {
		if ds[i].Canceled {
			ds[i].Content = ""
		}
	}
	return
}
