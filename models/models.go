package models

import (
	"time"
)

type Diet struct {
	Date      time.Time
	Timestamp string

	Type    int // MealType
	Content string
}

type User struct {
	ID int

	Grade  int
	Class  int
	Number int
	Name   string

	Card string

	BirthYear  int
	BirthMonth int
	BirthDay   int

	KitchenMemCode string
}
