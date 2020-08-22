package parse

func timestampHyphen2Dot(ts string) string {
	if len(ts) != 10 {
		return ts
	}

	return ts[0:4] + "." + ts[5:7] + "." + ts[8:10]
}
