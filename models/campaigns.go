package models

import (
	"fmt"
	"math/rand"
	"time"

	"github.com/google/uuid"

	"github.com/go-pg/pg"
)

func (cmp *Campaign) CreateNotPayed(conn *pg.Conn) error {
	cmp.ID = uuid.New().String()
	cnp := CampaignNotPayed{
		CampaignBase: cmp.CampaignBase,
	}
	return conn.Insert(&cnp)
}

func (cnp *CampaignNotPayed) Create(conn *pg.Conn) error {
	cnp.ID = uuid.New().String()

	for {
		cnp.PayCode = fmt.Sprintf("%04d", rand.Intn(10000))

		_, err := CampaignNotPayedByPayCode(conn, cnp.PayCode)
		if err == pg.ErrNoRows {
			break
		} else if err != nil {
			return err
		}
	}

	return conn.Insert(cnp)
}

func CampaignsNotPayedPayed(conn *pg.Conn) (cnps []CampaignNotPayed, err error) {
	err = conn.Model(&cnps).Where("payed_at is not null").Select()
	return
}

func CampaignNotPayedByPayCode(conn *pg.Conn, code string) (cnp CampaignNotPayed, err error) {
	err = conn.Model(&cnp).Where("pay_code = ?", code).First()
	return
}

func (cnp *CampaignNotPayed) UpdatePayment(conn *pg.Conn) error {
	cnp.UpdatedAt = time.Now()
	_, err := conn.Model(cnp).Column("payment", "pay_link").WherePK().Update()
	return err
}

func (cnp *CampaignNotPayed) UpdateAll(conn *pg.Conn) error {
	cnp.UpdatedAt = time.Now()
	_, err := conn.Model(cnp).WherePK().ExcludeColumn("id", "created_at", "deleted_at", "payed_at", "user_id", "is_ready").Update()
	return err
}

func (cnp *CampaignNotPayed) UpdatePayedAt(conn *pg.Conn) error {
	cnp.UpdatedAt = time.Now()
	_, err := conn.Model(cnp).WherePK().Column("payed_at").Update()
	return err
}

func (cnp *CampaignNotPayed) Move(conn *pg.Conn) error {
	_, err := conn.Model(cnp).WherePK().Delete()
	if err != nil {
		return err
	}

	cnp.DeletedAt = time.Time{}

	return conn.Insert(&Campaign{CampaignBase: cnp.CampaignBase})
}

func CampaignNotPayedByID(conn *pg.Conn, id string) (cnp CampaignNotPayed, err error) {
	err = conn.Model(&cnp).Where("id = ?", id).Select()
	return
}

func (u User) CampaignsNotPayed(conn *pg.Conn) (cnps []CampaignNotPayed, err error) {
	err = conn.Model(&cnps).Where("user_id = ?", u.ID).Select()
	return
}

func (cmp *Campaign) Create(conn *pg.Conn) error {
	cmp.ID = uuid.New().String()
	return conn.Insert(cmp)
}

func (u User) Campaigns(conn *pg.Conn, active bool) (cmps []Campaign, err error) {
	q := conn.Model(&cmps).Where("user_id = ?", u.ID)
	today := time.Now()
	if active {
		q.Where("start_at <= ?", today).Where("end_at > ?", today)
	} else {
		q.Where("start_at > current_timestamp")
	}
	err = q.Select()
	return
}

func CampaignsAll(conn *pg.Conn) (cmps []Campaign, err error) {
	err = conn.Model(&cmps).Select()
	return
}

func CampaignRandomOne(conn *pg.Conn) (cmp Campaign, err error) {
	rand.Seed(time.Now().UnixNano())
	_, err = conn.QueryOne(&cmp, `select * from campaigns where start_at <= current_timestamp and end_at >= current_timestamp offset floor(random()*(select count(*) from campaigns where start_at <= current_timestamp and end_at >= current_timestamp)) LIMIT 1`)
	if err != nil {
		return
	}
	return
}
