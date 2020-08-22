package models

import (
	"fmt"
	"log"

	"github.com/go-pg/pg"
)

func LogError(db *pg.DB, userID, accessLogID, loc string, contents ...interface{}) {
	content := fmt.Sprintln(contents...)
	content = content[:len(content)-len("\n")]
	errLog := ErrorLog{
		ID:          "",
		UserID:      userID,
		AccessLogID: accessLogID,
		Location:    loc,
		Content:     content,
	}
	if db != nil {
		if err := db.Insert(&errLog); err == nil {
			return
		}
	}

	log.Println(errLog)
}
