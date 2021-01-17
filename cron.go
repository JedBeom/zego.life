package main

import (
	"github.com/JedBeom/zego.life/parse"
	"github.com/robfig/cron/v3"
)

func crontab() {
	c := cron.New()
	conn := db.Conn()
	defer conn.Close()
	parse.Cron(c, conn)
	c.Start()
}
