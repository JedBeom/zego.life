package models

import (
	"github.com/go-pg/pg"
	"github.com/google/uuid"
)

func (n *Notice) Create(db *pg.Conn) error {
	n.ID = uuid.New().String()
	return db.Insert(n)
}

func NoticeLast(db *pg.Conn) (n Notice, err error) {
	err = db.Model(&n).Order("created_at DESC").First()
	return
}

// Update 함수는 제목과 작성자와 내용을 업뎃해요
func (n *Notice) Update(db *pg.Conn) error {
	_, err := db.Model(n).WherePK().Update()
	return err
}

func (n *Notice) Delete(db *pg.Conn) error {
	_, err := db.Model(n).WherePK().Delete()
	return err
}

func NoticeByID(db *pg.Conn, id string) (n Notice, err error) {
	err = db.Model(&n).Where("id = ?", id).Select()
	return
}

func NoticesAll(db *pg.Conn, limit int) (ns []Notice, err error) {
	err = db.Model(&ns).Order("created_at DESC").Limit(limit).Select()
	return
}
