package main

import (
	"flag"

	"github.com/JedBeom/zego.life/models"
)

// 설명이 없는 grade 필드 또는 변수는 0부터 시작한다.
/*
시간표의 구조
---
..............월.............................화

...........1교시 2교시           (생략)       1교시 2교시
1학년) 1반) 과목명 과목명                      과목명
...........교사명 교사명                      교사명
...........과목명 과목명                      과목명
...........교사명 교사명                      교사명
*/

func main() {
	pathPtr := flag.String("path", "", "시간표 csv 파일 경로")
	timetablesByGrades := Run(*pathPtr)

	conn := models.Connect()

	for _, byGrade := range timetablesByGrades {
		for _, byClass := range byGrade {
			err := conn.Insert(&byClass)
			if err != nil {
				panic(err)
			}
		}
	}
}
