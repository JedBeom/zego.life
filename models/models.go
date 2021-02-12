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

type TimetableTemplate struct {
	Grade, Class int
	Lessons      [][]Lesson
}

type Timetable struct {
	UserID    string `pg:",pk"`
	Lessons   [][]Lesson
	CreatedAt time.Time `sql:"default:now()"`
	UpdatedAt time.Time
}

type Lesson struct {
	Weekday int
	Order   int
	Subject string
	Teacher string
}

type RadioStory struct {
	ID     string
	UserID string
	User   *User

	Content     string `pg:",use_zero" sql:",notnull"`
	SongRequest string `pg:",use_zero" sql:",notnull"`

	Guest     bool `pg:",use_zero" sql:",notnull"`
	Anonymous bool `pg:",use_zero" sql:",notnull"`

	CreatedAt time.Time
}

type Thread struct {
	ID         string
	OpenUserID string
	OpenUser   *User

	Title string

	Visible bool

	CommentsNum int        `pg:",use_zero" sql:",notnull"`
	Comments    []*Comment `pg:"rel:has-many"`

	CreatedAt time.Time
	UpdatedAt time.Time
	DeletedAt time.Time `pg:",soft_delete"`
}

type Comment struct {
	ID  string
	Num int `pg:",use_zero" sql:",notnull"`

	ThreadID string
	Thread   *Thread

	UserID  string
	Visible bool

	Content string

	CreatedAt time.Time
	DeletedAt time.Time `pg:",soft_delete"`
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

type Vote struct {
	ID                 int
	S1, S2, S3, S4, S5 bool
	CreatedAt          time.Time
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
