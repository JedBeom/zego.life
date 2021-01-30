package models

import (
	"math/rand"
	"time"

	"github.com/google/uuid"

	"github.com/go-pg/pg"
)

func (cmp *Campaign) Create(conn *pg.Conn) error {
	cmp.ID = uuid.New().String()
	return conn.Insert(cmp)
}

func CampaignsAll(conn *pg.Conn) (cmps []Campaign, err error) {
	err = conn.Model(&cmps).Select()
	return
}

func CampaignRandomOne(conn *pg.Conn) (cmp Campaign, err error) {
	rand.Seed(time.Now().UnixNano())
	_, err = conn.QueryOne(&cmp, `select * from campaigns offset floor(random()*(select count(*) from campaigns)) LIMIT 1`)
	if err != nil {
		return
	}
	return
}
