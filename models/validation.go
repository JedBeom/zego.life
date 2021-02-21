package models

import (
	"regexp"

	"github.com/JedBeom/zego.life/apierror"
)

var (
	rEmail   = regexp.MustCompile("gch(19|20|21)-1[01]\\d[0-3]\\d@h.jne.go.kr")
	rBarcode = regexp.MustCompile("100(19|20|21)00\\d\\d\\d")
	rMemCode = regexp.MustCompile("ST20(19|20|21)0\\d\\d\\d") // ST20200001
)

func (u *User) ValidateUserRegister() (ure *apierror.UserRegisterError) {
	if !rEmail.MatchString(u.Email) {
		ure = &apierror.UserRegisterError{
			Field:   "email",
			Content: "이메일 형식이 맞지 않습니다. 학교 이메일이 맞나요?",
		}
		return
	}

	if u.Barcode != "" && !rBarcode.MatchString(u.Barcode) {
		ure = &apierror.UserRegisterError{
			Field:   "barcode",
			Content: "학생증이 올바르지 않습니다.",
		}
		return
	}

	if u.KitchenMemCode != "" && !rMemCode.MatchString(u.KitchenMemCode) {
		ure = &apierror.UserRegisterError{
			Field:   "kitchenMemCode",
			Content: "플라이키친 정보가 올바르지 않습니다. 다시 시도해보실래요?",
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

	if u.Class < 1 || (u.Grade == 1 && u.Class > 8) || (u.Grade == 2 && u.Class > 8) || (u.Grade == 3 && u.Class > 10) {
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
