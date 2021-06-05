package media

import (
	"io"

	"github.com/aws/aws-sdk-go/aws/endpoints"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3/s3manager"
)

var sess *session.Session

func ConnectAWS() {
	var err error
	sess, err = session.NewSessionWithOptions(session.Options{
		Config: aws.Config{
			Region: aws.String(endpoints.ApNortheast2RegionID),
		},
		SharedConfigState: session.SharedConfigEnable,
		SharedConfigFiles: []string{"/home/yuu/.aws/credentials", "~/.aws/credentials"},
	})

	if err != nil {
		panic(err)
	}
}

func UploadFile(file io.Reader, name, contentType string) (string, error) {
	uploader := s3manager.NewUploader(sess)
	k, err := uploader.Upload(&s3manager.UploadInput{
		ACL:         aws.String("public-read"),
		Body:        file,
		Bucket:      aws.String("zegolife"),
		ContentType: aws.String(contentType),
		Key:         aws.String(name),
	})
	if err != nil {
		return "", err
	}
	return k.Location, err
}
