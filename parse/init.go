package parse

import (
	sm "github.com/JedBeom/schoolmeal"
	"github.com/JedBeom/zego.life/models"
)

var (
	s sm.School
)

func init() {
	var err error
	s, err = sm.Find(sm.Jeonnam, "광양제철고등학교")
	if err != nil {
		models.LogError(nil, "", "", "parse.init()", err)
	}
}
