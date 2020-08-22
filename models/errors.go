package models

const (
	ErrPgErrCodeField = byte(67) // C

	ErrPgForeignKeyViolation = "23503"
	ErrPgUniqueViolation     = "23505"
)
