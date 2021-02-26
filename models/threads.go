package models

import (
	"time"

	"github.com/go-pg/pg"
	"github.com/go-pg/pg/orm"
)

func (t *Thread) Create(conn *pg.Conn) error {
	return conn.Insert(t)
}

func (t *Thread) CreateTx(tx *pg.Tx) error {
	return tx.Insert(t)
}

func (t *Thread) IncrementCommentsNumTx(tx *pg.Tx) error {
	t.UpdatedAt = time.Now()
	_, err := tx.Exec("update threads set comments_num = comments_num + 1, updated_at = ? where id = ?", t.UpdatedAt, t.ID)
	return err
}

func (t *Thread) Delete(conn *pg.Conn) error {
	_, err := conn.Model(&t).Delete()
	return err
}

func ThreadByID(conn *pg.Conn, id string) (t Thread, err error) {
	t.ID = id
	err = conn.Model(&t).WherePK().ExcludeColumn("open_user_id").Relation("Comments", func(q *orm.Query) (*orm.Query, error) {
		return q.Order("num").ExcludeColumn("user_id"), nil
	}).Select()
	return
}

func ThreadsAll(conn *pg.Conn, limit, page int) (ts []Thread, count int, err error) {
	count, err = conn.Model(&ts).Limit(limit).ExcludeColumn("open_user_id").Offset(limit * (page - 1)).Order("updated_at DESC").SelectAndCountEstimate(1000)
	return
}
