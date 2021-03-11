package main

import (
	"fmt"
	"io/ioutil"
	"strings"

	"github.com/JedBeom/zego.life/models"
)

func main1() {
	pdf2tt()
}

/*
var csTable = map[string]string{
	"선A": "cs01",
	"선B": "cs02",
	"선C": "cs03",
	"선D": "cs04",
}
*/

var subjectsInWeek = [3][]int{
	{7, 7, 7, 7, 7},
	{7, 7, 7, 6, 7},
	{6, 6, 7, 6, 6},
}

func sum(a []int) int {
	s := 0
	for _, i := range a {
		s += i
	}
	return s
}

var classesNum = [3]int{8, 8, 10}

func pdf2tt() {

	conn := models.Connect().Conn()

	for grade := 0; grade < 2; grade++ {

		file, err := ioutil.ReadFile(fmt.Sprintf("./parse/timetable/input/temp_input%d.txt", grade+1))
		if err != nil {
			panic(err)
		}

		lines := strings.Split(string(file), "\r\n")
		i := 0

		for class := 1; class <= classesNum[grade]; class++ {
			lessons := make([]models.Lesson, 0, sum(subjectsInWeek[grade]))
			weekday := 1
			order := 0
			limit := cap(lessons) + i
			for ; i < limit; i++ {
				l := models.Lesson{
					Weekday: weekday,
					Order:   order,
					Subject: lines[i],
				}

				if lines[i] == "음미" {
					l.Subject = "csArtS"
				} else if lines[i] == "외국" {
					l.Subject = "csForS"
				}

				order++
				if subjectsInWeek[grade][weekday-1] == order {
					weekday++
					order = 0
				}

				lessons = append(lessons, l)
			}

			lessonsIndex := 0
			for ; i < len(lines) && lessonsIndex < len(lessons); i++ {
				if lessons[lessonsIndex].Subject == "창체" {
					lessons[lessonsIndex].Teacher = "담당"
					lessonsIndex++
					i--
					continue
				}

				lessons[lessonsIndex].Teacher = lines[i]
				if lessons[lessonsIndex].Subject == "csArtS" {
					lessons[lessonsIndex].Teacher = "csArtT"
				} else if lessons[lessonsIndex].Subject == "csForS" {
					lessons[lessonsIndex].Teacher = "csForT"
				} else if strings.HasPrefix(lessons[lessonsIndex].Subject, "선") {
					lessons[lessonsIndex].Teacher = csTable[lessons[lessonsIndex].Subject] + "T"
					lessons[lessonsIndex].Subject = csTable[lessons[lessonsIndex].Subject] + "S"
				}

				lessonsIndex++
			}

			tt := models.TimetableTemplate{
				Grade: grade + 1,
				Class: class,
			}

			until := 0
			for x := 0; x < 5; x++ {
				tt.Lessons = append(tt.Lessons, lessons[until:until+subjectsInWeek[grade][x]])
				until += subjectsInWeek[grade][x]
			}

			if err := conn.Insert(&tt); err != nil {
				panic(err)
			}
		}
	}
}
