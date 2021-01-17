package models

import (
	"github.com/go-pg/pg"
	"github.com/google/uuid"
)

func (rs *RadioStory) Create(db *pg.Conn) error {
	rs.ID = uuid.New().String()
	return db.Insert(rs)
}

func RadioStoriesAll(db *pg.Conn, limit int) (rss []RadioStory, err error) {
	err = db.Model(&rss).Limit(limit).Relation("User").Order("created_at DESC").Select()
	return
}
