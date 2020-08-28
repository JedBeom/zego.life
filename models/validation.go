package models

import (
	"regexp"

	"github.com/JedBeom/zego.life/apierror"
)

var (
	rEmail   = regexp.MustCompile("gch(18|19|20)-1[01]\\d[0-3]\\d@h.jne.go.kr")
	rBarcode = regexp.MustCompile("100(18|19|20)00\\d\\d\\d")
)

func (u *User) ValidateUserRegister() (ure *apierror.UserRegisterError) {
	if !rEmail.MatchString(u.Email) {
		ure = &apierror.UserRegisterError{
			Field:   "email",
			Content: "이메일 형식이 맞지 않습니다. 학교 이메일이 맞나요?",
		}
		return
	}

	if !rBarcode.MatchString(u.Barcode) {
		ure = &apierror.UserRegisterError{
			Field:   "barcode",
			Content: "학생증이 올바르지 않습니다.",
		}
		return
	}

	if u.Grade < 1 || u.Grade > 3 {
		ure = &apierror.UserRegisterError{
			Field:   "grade",
			Content: "학년이 올바르지 않습니다. 1-3학년만 입력해주세요.",
		}
		return
	}

	if u.Class < 1 || u.Class > 9 {
		ure = &apierror.UserRegisterError{
			Field:   "class",
			Content: "반이 올바르지 않습니다.",
		}
		return
	}

	if len(u.Password) < 8 {
		ure = &apierror.UserRegisterError{
			Field:   "password",
			Content: "암호가 너무 짧습니다. 8글자 이상이여야 합니다.",
		}
		return
	}

	if u.Name == "" {
		ure = &apierror.UserRegisterError{
			Field:   "name",
			Content: "이름을 입력해주세요.",
		}
	}

	return
}
