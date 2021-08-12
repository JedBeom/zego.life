package main

import (
	"strings"
	"unicode/utf8"

	"github.com/JedBeom/zego.life/models"
)

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
