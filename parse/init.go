package parse

import (
	sm "github.com/JedBeom/schoolmeal"
)

var (
	s sm.School
)

func init() {
	var err error
	s, err = sm.Find(sm.Jeonnam, "광양제철고등학교")
	if err != nil {
		panic(err)
	}
}
