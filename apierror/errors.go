package apierror

import (
	"fmt"
	"net/http"

	"github.com/labstack/echo"
)

type ApiError struct {
	StatusCode int `json:"-"`
	ErrorCode  int
	Message    string
}

func NewApiError(status int, code int, message string) ApiError {
	return ApiError{
		StatusCode: status,
		ErrorCode:  code,
		Message:    message,
	}
}

func (e ApiError) Send(c echo.Context) error {
	if err := c.JSON(e.StatusCode, e); err != nil {
		return err
	}

	return e
}

func (e ApiError) Error() string {
	return fmt.Sprintf("Status=%d, Error=%d: %s", e.StatusCode, e.ErrorCode, e.Message)
}

var (
	ErrUnknown   = NewApiError(502, -10, "서버에 문제가 발생했습니다.")
	ErrDBErr     = NewApiError(http.StatusInternalServerError, -11, "error occur")
	ErrInterface = NewApiError(http.StatusInternalServerError, -12, "err occur")

	ErrLoginFailed    = NewApiError(http.StatusUnauthorized, -100, "이메일 또는 암호가 올바르지 않습니다.")
	ErrInvalidKey     = NewApiError(http.StatusUnauthorized, -101, "bad token")
	ErrEmailNotUnique = NewApiError(http.StatusBadRequest, -102, "이미 존재하는 이메일입니다.")

	ErrFirstParse = NewApiError(http.StatusInternalServerError, -200, "error on first d2u parse")
)

type UserRegisterError struct {
	Field   string
	Content string
}

func (e UserRegisterError) Send(c echo.Context) error {
	if err := c.JSON(http.StatusBadRequest, e); err != nil {
		return err
	}

	return e
}

func (e UserRegisterError) Error() string {
	return fmt.Sprintf("Field=%s, Content=%s", e.Field, e.Content)
}
