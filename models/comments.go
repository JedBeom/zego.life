package models

import (
	"github.com/go-pg/pg"
	"github.com/lithammer/shortuuid/v3"
)

func (c *Comment) Create(conn *pg.Conn) error {
	c.ID = shortuuid.New()
	return conn.Insert(c)
}

func (c *Comment) CreateTx(tx *pg.Tx) error {
	c.ID = shortuuid.New()
	return tx.Insert(c)
}
