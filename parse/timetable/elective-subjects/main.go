package main

import (
	"flag"
)

func main() {
	pathPtr := flag.String("path", "", "선택과목 csv 파일 경로")
	gradePtr := flag.Int("grade", "", "선택과목 대상 학년")

	if *pathPtr == "" || *gradePtr == 0 {

	}
}
