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
	ErrUnknown   = NewApiError(502, -10, "unknown error was aborted")
	ErrDBErr     = NewApiError(http.StatusInternalServerError, -11, "error occur")
	ErrInterface = NewApiError(http.StatusInternalServerError, -12, "err occur")

	ErrLoginFailed    = NewApiError(http.StatusUnauthorized, -100, "email or password is invalid")
	ErrInvalidKey     = NewApiError(http.StatusUnauthorized, -101, "bad token")
	ErrEmailNotUnique = NewApiError(http.StatusBadRequest, -102, "email already exists")

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
