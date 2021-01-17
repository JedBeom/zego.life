package models

import (
	"github.com/go-pg/pg"
)

func (r *DietReview) Create(db *pg.Conn) error {
	return db.Insert(r)
}

func DietReviewPossible(db *pg.Conn, dietID string, userID string) (d Diet, err error) {
	// 먼저 리뷰 있는지 확인
	if exists, err := db.Model(&DietReview{}).Where("diet_id = ?", dietID).
		Where("user_id = ?", userID).Exists(); exists || err != nil {
		return d, err
	}

	d2u, err := Diet2UserByDietAndUser(db, dietID, userID)
	if err != nil {
		return d, err
	}

	if !d2u.Applied {
		return
	}

	// 존재하지 않으면
	d, err = DietByID(db, dietID)
	return
}
