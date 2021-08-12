package common

import (
	"bytes"
	"encoding/csv"
	"io/ioutil"
)

func LoadAndReadCSV(path string) (*csv.Reader, error) {
	file, err := ioutil.ReadFile(path)
	if err != nil {
		return nil, err
	}

	return csv.NewReader(bytes.NewReader(file)), nil
}
