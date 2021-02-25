package main

import (
	"bytes"
	"encoding/csv"
	"fmt"
	"io"
	"io/ioutil"
	"log"
	"strings"

	"github.com/JedBeom/zego.life/models"
)

var (
	classes = [][]models.TimetableTemplate{
		{{}, {}, {}, {}, {}, {}, {}, {}},
		{{}, {}, {}, {}, {}, {}, {}, {}, {}, {}},
		{{}, {}, {}, {}, {}, {}, {}, {}, {}, {}},
	}
	// grade class weekday
)

var (
	weekdays = []string{"monday", "tuesday", "wednesday", "thursday", "friday"}
)

func main1() {
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
				fmt.Println(err)
			}
		}
	}
	fmt.Println(classes[0][0].Lessons[1])
	fmt.Println(classes[0][0].Lessons[2])
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
				if lessonName == "" {
					subjectAmount -= 1
					continue
				}

				l := models.Lesson{
					Weekday: weekNum,
					Order:   j,
					Subject: lessonName,
				}
				timetable = append(timetable, l)
			}

		} else {
			for j, teacherName := range record {
				if teacherName == "" {
					continue
				}
				timetable[len(timetable)-subjectAmount+j].Teacher = strings.Replace(teacherName, "\n", ",", -1)
			}

			classes[grade-1][class-1].Lessons = append(classes[grade-1][class-1].Lessons, timetable)
			timetable = nil

			class++
			if grade == 1 && class > 8 {
				grade++
				class = 1
			} else if grade == 2 && class > 10 {
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
