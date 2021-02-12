package main

import (
	"log"
	"time"

	"github.com/JedBeom/zego.life/parse"

	"github.com/JedBeom/zego.life/media"
	"github.com/JedBeom/zego.life/models"
	"github.com/go-pg/pg"
	"github.com/labstack/echo"
	"github.com/lithammer/shortuuid/v3"
)

func getCampaign(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	cmp, err := models.CampaignRandomOne(conn)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, cmp)
}

// admin-only
func getCampaignsNotPayedPayed(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	cnps, err := models.CampaignsNotPayedPayed(conn)
	if err != nil {
		log.Println(err)
		return err
	}

	return c.JSON(200, cnps)
}

func getCampaignsByUser(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u := c.Get("user").(models.User)
	active := c.QueryParam("active")

	cmps, err := u.Campaigns(conn, active == "true")
	if err != nil {
		return err
	}

	return c.JSON(200, cmps)
}

func getCampaignsNotPayedByUser(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u := c.Get("user").(models.User)

	cmps, err := u.CampaignsNotPayed(conn)
	if err != nil {
		return err
	}

	return c.JSON(200, cmps)
}

func getCampaignNotPayedByID(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	id := c.Param("id")
	userInclude := c.QueryParam("user_include") == "true"

	cnp, err := models.CampaignNotPayedByID(conn, id)
	if err != nil {
		log.Println(err)
		return err
	}

	if userInclude {
		user, err := models.UserByID(conn, cnp.UserID)
		if err != nil {
			return err
		}
		cnp.User = &user
	}

	return c.JSON(200, cnp)
}

func postCampaignNotPayed(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u := c.Get("user").(models.User)
	p := struct {
		Title, SubTitle, ImageSrc, Link string
		StartAt, EndAt                  time.Time
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	cnp := models.CampaignNotPayed{
		CampaignBase: models.CampaignBase{
			Title:    p.Title,
			SubTitle: p.SubTitle,
			ImageSrc: p.ImageSrc,
			Link:     p.Link,
			UserID:   u.ID,
			StartAt:  p.StartAt,
			EndAt:    p.EndAt,
		},
	}
	cnp.Price = int(cnp.EndAt.Sub(cnp.StartAt).Hours()) * 20

	if err := cnp.Create(conn); err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(200, cnp)
}

func patchCampaignPayment(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u := c.Get("user").(models.User)
	id := c.Param("id")

	if id == "" {
		return echo.ErrBadRequest
	}

	cnp, err := models.CampaignNotPayedByID(conn, id)
	if err != nil {
		return err
	}

	if cnp.PayedAt != nil {
		return echo.ErrBadRequest
	}

	if cnp.UserID != u.ID {
		return echo.ErrUnauthorized
	}

	p := struct {
		Payment int
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}
	if p.Payment < 0 && p.Payment > 2 {
		return echo.ErrBadRequest
	}

	payment := []string{"toss", "kakaopay", "bank"}[p.Payment]
	cnp.Payment = payment
	link, err := parse.PayLink(cnp.Payment, cnp.PayCode, cnp.Price)
	if err != nil {
		log.Println(err)
		return err
	}
	cnp.PayLink = link
	if err := cnp.UpdatePayment(conn); err != nil {
		log.Println(err)
		return err
	}

	return c.JSON(200, cnp)
}

func patchCampaignNotPayed(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u := c.Get("user").(models.User)
	id := c.Param("id")

	if id == "" {
		return echo.ErrBadRequest
	}

	p := struct {
		Title, SubTitle, Link, ImageSrc string
		StartAt, EndAt                  time.Time
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	cnp, err := models.CampaignNotPayedByID(conn, id)
	if err != nil {
		log.Println(err)
		return err
	}

	if cnp.PayedAt != nil {
		return echo.ErrBadRequest
	}

	cnp.Title = p.Title
	cnp.SubTitle = p.SubTitle
	cnp.Link = p.Link
	cnp.ImageSrc = p.ImageSrc
	cnp.StartAt = p.StartAt
	cnp.EndAt = p.EndAt

	if cnp.UserID != u.ID {
		return echo.ErrUnauthorized
	}

	cnp.Price = int(cnp.EndAt.Sub(cnp.StartAt).Hours()) * 20
	if err := cnp.UpdateAll(conn); err != nil {
		log.Println(err)
		return err
	}

	return c.JSON(200, cnp)
}

func patchCampaignNotPayedConfirmPay(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u := c.Get("user").(models.User)
	p := struct {
		Payed bool
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}
	id := c.Param("id")

	cnp, err := models.CampaignNotPayedByID(conn, id)
	if err != nil {
		return err
	}

	if cnp.UserID != u.ID {
		return echo.ErrUnauthorized
	}

	if p.Payed {
		now := time.Now()
		cnp.PayedAt = &now
	} else {
		cnp.PayedAt = nil
	}

	if err := cnp.UpdatePayedAt(conn); err != nil {
		return err
	}

	return c.NoContent(200)
}

// admin-only
func patchCampaignMoveByID(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	id := c.Param("id")
	cnp, err := models.CampaignNotPayedByID(conn, id)
	if err != nil {
		return err
	}

	if err := cnp.Move(conn); err != nil {
		return err
	}

	return c.NoContent(200)
}

// admin-only for now
func postCampaign(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	u := c.Get("user").(models.User)
	p := struct {
		Title, SubTitle, ImageSrc, Link string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	cmp := models.Campaign{
		CampaignBase: models.CampaignBase{
			IsReady:  true,
			Title:    p.Title,
			SubTitle: p.SubTitle,
			ImageSrc: p.ImageSrc,
			Link:     p.Link,
			UserID:   u.ID,
		},
	}
	if err := cmp.Create(conn); err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.String(200, cmp.ID)
}

func postCampaignImage(c echo.Context) error {
	fileType := c.FormValue("type")
	c.Request().ParseMultipartForm(10 << 20)
	file, err := c.FormFile("file")
	if err != nil {
		return echo.ErrBadRequest
	}
	src, err := file.Open()
	if err != nil {
		return err
	}
	defer src.Close()

	link, err := media.UploadFile(src, "campaigns/images/"+shortuuid.New(), fileType)
	if err != nil {
		log.Println(err)
		return err
	}

	return c.String(200, link)
}
