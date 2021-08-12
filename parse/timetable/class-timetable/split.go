package main

import (
	"encoding/csv"
	"errors"
	"io"

	"github.com/JedBeom/zego.life/models"
)

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

func getLessonsDay(grade int, lines [][]string) (subjects []models.Subject, err error) {
	if len(lines) != 2 {
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
