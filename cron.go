package main

import (
	"github.com/JedBeom/zego.life/parse"
	"github.com/robfig/cron/v3"
)

func crontab() {
	c := cron.New()
	parse.Cron(c, db)
	c.Start()
}
