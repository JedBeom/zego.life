package models

import (
	"github.com/go-pg/pg"
	"github.com/google/uuid"
)

func (rs *RadioStory) Create(db *pg.DB) error {
	rs.ID = uuid.New().String()
	return db.Insert(rs)
}

func RadioStoriesAll(db *pg.DB, limit int) (rss []RadioStory, err error) {
	err = db.Model(&rss).Limit(limit).Order("created_at DESC").Select()
	return
}
