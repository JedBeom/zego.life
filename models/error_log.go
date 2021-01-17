package models

import (
	"fmt"
	"log"

	"github.com/google/uuid"

	"github.com/go-pg/pg"
)

func LogError(db *pg.Conn, userID, accessLogID, loc string, contents ...interface{}) {
	content := fmt.Sprintln(contents...)
	content = content[:len(content)-len("\n")]
	errLog := ErrorLog{
		ID:          uuid.New().String(),
		UserID:      userID,
		AccessLogID: accessLogID,
		Location:    loc,
		Content:     content,
	}
	if db != nil {
		if err := db.Insert(&errLog); err == nil {
			return
		} else {
			log.Println(err)
		}
	}

	log.Println(errLog)
}
