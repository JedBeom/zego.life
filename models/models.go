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

	EnterYear int `sql:",unique:gcn"`
	Grade     int `sql:",unique:gcn"`
	Class     int `sql:",unique:gcn"`
	Number    int `sql:",unique:gcn"`
	Name      string

	Sex int // 1: male 2: female

	Email    string `sql:",unique"`
	Password string `json:"-"`

	Barcode        string `sql:",unique"`
	KitchenMemCode string `sql:",unique"`

	BirthYear  int
	BirthMonth int
	BirthDay   int

	Roles string

	Residence int // 1: 기숙 2: 광양

	CreatedAt time.Time `sql:"default:now()"`
	UpdatedAt time.Time `sql:"default:now()"`
}

type UserUpgrade struct {
	ID string `pg:",pk"`

	Grade  int `sql:",unique:gcn"`
	Class  int `sql:",unique:gcn"`
	Number int `sql:",unique:gcn"`

	CreatedAt time.Time `sql:"default:now()"`
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

type DietReview struct {
	DietID string `pg:",pk"`
	Diet   *Diet  `json:"-"`
	UserID string `pg:",pk"`
	User   *User  `json:"-"`

	Rate      int `sql:",notnull" pg:",use_zero"`
	BestIndex int
	BestMenu  string

	CreatedAt time.Time `sql:"default:now()" json:"-"`
}

type Event struct {
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

type DDayEvent struct {
	TableName struct{} `sql:"dday_events" json:"-"`

	ID   string
	Name string
	Date time.Time

	Target int // -1: all, 1: grade1, 2: grade2, 3: grade3

	CreatedAt time.Time `sql:"default:now()" json:"-"`
}

type Notice struct {
	ID          string
	Title       string
	Content     string
	ContentHTML string
	Author      string
	CreatedAt   time.Time `sql:"default:now()"`
	UpdatedAt   time.Time
	DeletedAt   time.Time `pg:",soft_delete"`
}

type Feedback struct {
	ID     string
	UserID string
	User   *User

	Content string
	Answer  string

	CreatedAt time.Time
}

type ClassTimetable struct {
	Grade, Class int
	Subjects     [][]Subject
}

type ElectiveSubjectsToUser struct {
	UserID             string `pg:",pk"`
	ElectiveSubjectIDs map[string]int

	CreatedAt time.Time `sql:"default:now()"`
	UpdatedAt time.Time
}

type Subject struct {
	tableName struct{} `pg:"elective_subjects"`

	ID        int `pg:",pk" json:",omitempty"`
	Grade     int
	ShortName string
	FullName  string
	Teacher   string
	Room      string

	/*
		형식은 0000000, 각각
		1) 예술 과목 여부
		2) 교양 과목 여부
		3) 외국어 과목 여부
		4) 선택A
		5) 선택B
		6) 선택C
		7) 선택D
		...를 나타낸다.

		ClassTimetables 테이블에서는 1이 0개 또는 1개 존재해야한다.
		ElectiveSubjects 테이블에서는 1개 이상 존재해야 한다.
	*/
	AvailableBit int
}

type CampaignBase struct {
	ID      string
	IsReady bool

	Title    string
	SubTitle string
	ImageSrc string `pg:",use_zero" sql:",notnull"`
	Link     string `pg:",use_zero" sql:",notnull"`

	UserID string
	User   *User

	Price   int
	Payment string
	PayedAt *time.Time
	PayCode string

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt time.Time `pg:",soft_delete"`
	StartAt   time.Time
	EndAt     time.Time
}

type Campaign struct {
	CampaignBase
}

type CampaignNotPayed struct {
	TableName struct{} `sql:"campaigns_not_payed" json:"-"`
	CampaignBase
	PayLink string
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
	Status    int
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

type Token struct {
	ID        string
	Type      int // 1: pw_change
	UserID    string
	User      *User
	CreatedAt time.Time `sql:"default:now()"`
	UsedAt    time.Time
}

type Setting struct {
	Key   string `pk:",pk"`
	Value string
}
