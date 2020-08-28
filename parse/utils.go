package parse

import "time"

func timestampHyphen2Dot(ts string) string {
	if len(ts) != 10 {
		return ts
	}

	return ts[0:4] + "." + ts[5:7] + "." + ts[8:10]
}

func getHyphenTimestampWeekday(ts string) time.Weekday {
	t, _ := time.Parse("2006-01-02", ts)
	return t.Weekday()
}
