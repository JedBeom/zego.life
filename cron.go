package main

import (
	"github.com/JedBeom/zego.life/parse"
	"github.com/robfig/cron/v3"
)

func schedule() {
	c := cron.New()
	parse.Cron(c, db)
	c.Start()
}
