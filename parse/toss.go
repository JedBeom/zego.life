package parse

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"strings"

	"github.com/buger/jsonparser"
)

func TossButton(msg string, amount int) (link string, err error) {
	format := `{
	"apiKey": "%s",
	"bankName": "%s",
	"bankAccountNo": "%s",
	"amount": %d,
	"message": "%s"
}`

	body := fmt.Sprintf(format, os.Getenv("TOSS_API_KEY"), os.Getenv("BANK_NAME"), os.Getenv("BANK_ACCOUNT"), amount, msg)
	post, err := http.Post("https://toss.im/transfer-web/linkgen-api/link", "application/json", strings.NewReader(body))
	if err != nil {
		return
	}

	all, err := ioutil.ReadAll(post.Body)
	link, err = jsonparser.GetString(all, "success", "link")
	return
}
