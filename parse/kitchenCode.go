package parse

import (
	"errors"
	"io/ioutil"
	"net/http"
	"net/url"
	"strconv"
	"strings"
)

func loginKitchen(g, c, n int, password string) (*http.Response, error) {
	form := url.Values{}
	data := map[string]string{
		"mode":     "login_proc",
		"log_code": "SC0071",
		"t_chk":    "n",
		"log_hak":  strconv.Itoa(g),
		"log_ban":  strconv.Itoa(c),
		"log_num":  strconv.Itoa(n),
		"mem_pass": password,
		"pp":       "on",
	}
	for k, v := range data {
		form.Add(k, v)
	}
	return http.Post("http://gwang.i-zone.kr/login.php", "application/x-www-form-urlencoded", strings.NewReader(form.Encode()))
}

func getKitchenCookie(g, c, n int, password string) (cookie *http.Cookie, err error) {
	res, err := loginKitchen(g, c, n, password)
	if err != nil {
		return
	}
	for _, c := range res.Cookies() {
		if c.Name == "PHPSESSID" {
			cookie = c
			return
		}
	}

	err = errors.New("cannot find cookie")
	return
}

func GetMemCode(g, c, n int, password string) (memCode string, err error) {
	co, err := getKitchenCookie(g, c, n, password)
	if err != nil {
		return
	}

	req, err := http.NewRequest("GET", "http://gwang.i-zone.kr/main.php", nil)
	if err != nil {
		return
	}
	req.AddCookie(co)
	client := &http.Client{}
	resp, err := client.Do(req)
	if err != nil {
		return
	}
	defer func() {
		_ = resp.Body.Close()
	}()

	data, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return
	}

	body := string(data)
	i := strings.Index(body, "mem_code=")
	memCode = body[len("mem_code=")+i : len("mem_code=ST20200001")+i]
	if memCode == "&dtod_code" {
		memCode = ""
	}
	return
}
