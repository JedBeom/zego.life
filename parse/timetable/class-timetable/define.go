package main

var (
	lineNoByGrade = []int{8 * 2, 8*2 + 8*2, 8*2 + 8*2 + 10*2} // 반의 수*2 (과목명 한줄, 교사 한줄)

	electiveSubjectBitTable = map[string]int{
		"음미": 0b1000000,
		"교양": 0b0100000,
		"외국": 0b0010000,
		"선A": 0b001000,
		"선B": 0b000100,
		"선C": 0b000010,
		"선D": 0b000001,
	}

	compulsorySubjectNameTable = []map[string]string{
		// grade 1
		{
			"통사": "통합사회",
			"통과": "통합과학",
			"생윤": "생활과 윤리",
			"물리": "물리학Ⅰ",
			"영회": "영어회화",
			"실험": "과학탐구실험",
		},
		// grade 2
		{
			"영어": "영어Ⅱ",
			"수학": "수학Ⅱ",
			"체육": "운동과 건강",
		},
		// grade 3
		// TODO: fill
		{},
	}
)
