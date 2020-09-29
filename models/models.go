package models

import (
	"time"
)

type Diet struct {
	ID string `pg:",pk"`

	Date      time.Time
	Timestamp string

	Type    int // MealType
	Content string

	Canceled bool `pg:",use_zero" sql:",notnull"`

	CreatedAt time.Time `sql:"default:now()"`
}

type User struct {
	ID string `pg:",pk"`

	Grade  int `sql:",unique:gcn"`
	Class  int `sql:",unique:gcn"`
	Number int `sql:",unique:gcn"`
	Name   string

	Email    string `sql:",unique"`
	Password string `json:"-"`

	Barcode        string `sql:",unique"`
	KitchenMemCode string `sql:",unique"`

	BirthYear  int
	BirthMonth int
	BirthDay   int

	CreatedAt time.Time `sql:"default:now()"`
	UpdatedAt time.Time `sql:"default:now()"`
}

type Diet2User struct {
	TableName struct{} `sql:"diet2users" json:"-"`

	DietID  string `pg:",pk"`
	Diet    *Diet  `json:"-"`
	UserID  string `pg:",pk"`
	User    *User  `json:"-"`
	Applied bool   `pg:",use_zero" sql:",notnull"`

	CreatedAt time.Time `sql:"default:now()" json:"-"`
}

type Schedule struct {
	ID         string
	Name       string
	Date       time.Time
	DateString string
	Type       int `pg:",use_zero" sql:",notnull"`

	Grade1 bool `pg:",use_zero" sql:",notnull"`
	Grade2 bool `pg:",use_zero" sql:",notnull"`
	Grade3 bool `pg:",use_zero" sql:",notnull"`

	CreatedAt time.Time `sql:"default:now()" json:"-"`
}

type Session struct {
	ID        string
	UserID    string
	User      *User
	CreatedAt time.Time `sql:"default:now()"`
	DeletedAt time.Time `pg:",soft_delete"`
}

type AccessLog struct {
	ID        string `pg:",pk"`
	SessionID string
	IP        string
	Method    string
	Path      string
	Error     string
	CreatedAt time.Time `sql:"default:now()"`
}

type ErrorLog struct {
	ID          string `pg:",pk"`
	UserID      string
	AccessLogID string
	Location    string
	Content     string
	CreatedAt   time.Time `sql:"default:now()"`
}

type Setting struct {
	Key   string `pk:",pk"`
	Value string
}
