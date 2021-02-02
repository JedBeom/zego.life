package models

import (
	"fmt"

	"github.com/go-pg/pg"
)

func (v *Vote) Create(conn *pg.Conn) error {
	return conn.Insert(v)
}

func VotesCountAll(conn *pg.Conn) (result [5]int, err error) {
	for i := range result {
		result[i], err = conn.Model(&Vote{}).Where(fmt.Sprintf("S%d = 't'", i+1)).Count()
		if err != nil {
			return
		}
	}

	return
}
