package main

import (
	"fmt"

	"github.com/JedBeom/zego.life/models"
	_ "github.com/joho/godotenv/autoload"
)

func main() {
	db := models.Connect()
	conn := db.Conn()
	/*
		u := "1cd59371-530f-47dd-9912-beeeeb21df76"
		cmp := models.Campaign{
			IsReady:  true,
			Title:    "법칙, 원리, 공식을 쉽게 정리한",
			SubTitle: "물리.화학 사전",
			ImageSrc: "",
			UserID:   u,
		}
		cmp1 := models.Campaign{
			IsReady:  true,
			Title:    "인생 뭐 있나",
			SubTitle: "사는게 니나노",
			ImageSrc: "",
			UserID:   u,
		}
		cmp2 := models.Campaign{
			IsReady:  true,
			Title:    "카카오톡 버리자!",
			SubTitle: "개념탑재 메신저 텔레그램",
			ImageSrc: "",
			UserID:   u,
		}
		if err := cmp.Create(conn); err != nil {
			panic(err)
		}
		if err := cmp1.Create(conn); err != nil {
			panic(err)
		}
		if err := cmp2.Create(conn); err != nil {
			panic(err)
		}
	*/
	cmp, err := models.CampaignRandomOne(conn)
	if err != nil {
		panic(err)
	}

	fmt.Println(cmp)
}
