package parse

import (
	"errors"
	"os"
)

func PayLink(payment, payCode string, amount int) (string, error) {
	switch payment {
	case "bank":
		return "", nil
	case "kakaopay":
		return os.Getenv("KAKAOPAY_LINK"), nil
	case "toss":
		link, err := TossButton("제라"+payCode, amount)
		return link, err
	}

	return "", errors.New("unknown payment")
}
