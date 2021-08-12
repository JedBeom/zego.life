package main

var (
	bitTable = map[string]int{
		// 선택과목
		"A": 0b0001000,
		"B": 0b0000100,
		"C": 0b0000010,
		"D": 0b0000001,
		// 예술, 교양, 외국어
		"R": 0b1000000, // a'R't
		"E": 0b0100000, // 'E'xtra
		"F": 0b0010000, // 'F'oreign Language
	}
)
