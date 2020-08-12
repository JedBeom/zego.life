package parse

import (
	sm "github.com/JedBeom/schoolmeal"
)

var (
	s sm.School
)

func init() {
	sm.Find(sm.Jeonnam, "광양제철고등학교")
}
