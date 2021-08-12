package main

import (
	"bytes"
	"encoding/csv"
	"errors"
	"io"
	"io/ioutil"
	"log"
	"strings"
	"unicode/utf8"

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

func loadCSVAndNewReader(path string) (*csv.Reader, error) {
	file, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}

	return csv.NewReader(bytes.NewReader(file)), nil
}

func splitByGrade(r *csv.Reader) ([][][]string, error) {
	linesByGrade := [][][]string{
		{}, {}, {},
	}

	grade := 0
	for i := 0; true; i++ {
		line, err := r.Read()
		if err == io.EOF { // End of file
			break
		}

		if err != nil {
			return nil, err
		}

		if i == lineNoByGrade[grade] {
			grade++
		}

		line = append(line, "") // 금요일 8교시가 전부 비어있어, csv에서 없는 열이 되어버림.
		// 따라서 각 줄마다 금요일 8교시 추가.

		linesByGrade[grade] = append(linesByGrade[grade], line)
	}

	return linesByGrade, nil
}

func splitByClass(lines [][]string) (linesByClass [][][]string, err error) {
	for i, line := range lines {
		if i%2 == 0 {
			linesByClass = append(linesByClass, [][]string{line})
		} else {
			linesByClass[len(linesByClass)-1] = append(linesByClass[len(linesByClass)-1], line)
		}
	}

	return
}

func splitByDay(lines [][]string) [][][]string {
	const LessonsEachDay = 8
	linesByWeekday := [][][]string{
		{}, {}, {}, {}, {},
	}

	for _, line := range lines {
		if len(line) < (LessonsEachDay * 5) {
			break
		}

		for weekday := 0; weekday < 5; weekday++ {
			linesByWeekday[weekday] = append(linesByWeekday[weekday], line[weekday*LessonsEachDay:(weekday+1)*LessonsEachDay])
		}
	}

	return linesByWeekday
}

func purifyShortName(a string) string {
	a = strings.TrimSpace(a)
	if utf8.RuneCountInString(a) > 2 {
		a = string([]rune(a)[1:3])
	}

	return a
}

func fillSubjectName(grade int, shortName string) (subject models.Subject) {
	shortName = purifyShortName(shortName)

	if bit, ok := electiveSubjectBitTable[shortName]; ok {
		subject.AvailableBit = bit
	} else {
		subject.Grade = grade
		subject.ShortName = shortName

		fullName, ok := compulsorySubjectNameTable[grade][shortName]
		if ok {
			subject.FullName = fullName
		} else {
			subject.FullName = shortName
		}
	}

	return
}

func getLessonsDay(grade int, lines [][]string) (subjects []models.Subject, err error) {
	if len(lines) != 2 {
		log.Println("len(lines):", len(lines))
		err = errors.New("getLessonsDay: len(lines) must be 2")
		return
	}

	subjectNames := lines[0]
	teacherNames := lines[1]

	for _, shortName := range subjectNames {
		if shortName == "" {
			break
		}

		subjects = append(subjects, fillSubjectName(grade, shortName))

	}

	for i, teacher := range teacherNames {
		if subjectNames[i] == "" {
			break
		}

		if subjects[i].AvailableBit != 0 || teacher == "" {
			continue
		}

		subjects[i].Teacher = teacher
	}

	return
}
