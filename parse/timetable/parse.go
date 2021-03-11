package main

import (
	"bytes"
	"encoding/csv"
	"io"
	"io/ioutil"
	"log"
	"strings"

	"github.com/JedBeom/zego.life/models"
)

var (
	classes = [][]models.TimetableTemplate{
		{{}, {}, {}, {}, {}, {}, {}, {}},
		{{}, {}, {}, {}, {}, {}, {}, {}},
		{{}, {}, {}, {}, {}, {}, {}, {}, {}, {}},
	}
	// grade class weekday
)

var csTable = map[string]string{
	"선A":  "cs01",
	"선A1": "cs011",
	"선A2": "cs012",
	"선B":  "cs02",
	"선C":  "cs03",
	"선C1": "cs031",
	"선C2": "cs032",
	"선D":  "cs04",
	"음미":  "csArt",
	"외국":  "csFor",
	"교양":  "csExt",
}

var (
	weekdays = []string{"monday", "tuesday", "wednesday", "thursday", "friday"}
)

func main() {
	for x := range classes {
		for y := range classes[x] {
			classes[x][y].Grade = x + 1
			classes[x][y].Class = y + 1
		}
	}
	for i, d := range weekdays {
		parse(i, d)
	}
	db := models.Connect()
	for x := range classes {
		for y := range classes[x] {
			if err := db.Insert(&classes[x][y]); err != nil {
				log.Println(err)
			}
		}
	}
}

func parse(weekNum int, weekDay string) {
	file, err := ioutil.ReadFile("./parse/timetable/" + weekDay + "_output.csv")
	if err != nil {
		panic(err)
	}

	r := csv.NewReader(bytes.NewReader(file))

	timetable := make([]models.Lesson, 0)

	i := 0 // csv index
	grade := 1
	class := 1
	subjectAmount := 0
	for {
		record, err := r.Read()
		if err == io.EOF {
			break
		}
		if err != nil {
			log.Fatal(err)
		}

		if i%2 == 0 { // 짝수 = 과목
			subjectAmount = len(record)
			for j, lessonName := range record {
				if strings.TrimSpace(lessonName) == "" {
					subjectAmount -= 1
					continue
				}
				log.Println(lessonName, subjectAmount)

				l := models.Lesson{
					Weekday: weekNum,
					Order:   j,
					Subject: strings.TrimSpace(lessonName),
				}
				timetable = append(timetable, l)
			}

		} else {
			for j, teacherName := range record {
				index := len(timetable) - subjectAmount + j

				if teacherName == "" {
					continue
				}

				csValue, ok := csTable[timetable[index].Subject]

				if ok {
					timetable[index].Subject = csValue
					timetable[index].Teacher = csValue + "T"
				} else {
					timetable[index].Teacher = strings.TrimSpace(teacherName)
				}
			}

			classes[grade-1][class-1].Lessons = append(classes[grade-1][class-1].Lessons, timetable)
			timetable = nil

			class++
			if grade == 1 && class > 8 {
				grade++
				class = 1
			} else if grade == 2 && class > 8 {
				grade++
				class = 1
			} else if grade == 3 && class > 10 {
				break
			}

			subjectAmount = 0
		}

		i++
	}

}
