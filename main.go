package main

import (
	"fmt"
	sm "github.com/JedBeom/schoolmeal"
	"time"

	_ "github.com/joho/godotenv/autoload"
)

func main() {
	school, err := sm.Find(sm.Jeonnam, "광양제철고등학교")
	if err != nil {
		panic(err)
	}

	fmt.Println(school.Code, school.Kind)

	meal, _ := school.GetWeekMeal("2020.08.11", sm.Dinner)
	fmt.Println(meal[time.Tuesday])
}
