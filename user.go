package main

import (
	"log"
	"strconv"
	"strings"
	"time"

	"github.com/go-pg/pg"

	"github.com/JedBeom/zego.life/apierror"
	"github.com/JedBeom/zego.life/models"
	"github.com/labstack/echo"
)

const LimitDefault = 10

func getMe(c echo.Context) error {
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	return c.JSON(200, u)
}

func patchUserV1(c echo.Context) error {
	u, ok := c.Get("user").(models.User)
	if !ok {
		return apierror.ErrInterface.Send(c)
	}

	userID := c.Param("user_id")

	if userID != u.ID && !strings.Contains(u.Roles, "admin,") {
		return echo.ErrUnauthorized
	}

	p := struct {
		IsMale        bool
		IsDorm        bool
		BirthdayYear  int
		BirthdayMonth int
		BirthdayDay   int
	}{}

	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	if p.IsMale {
		u.Sex = 1
	} else {
		u.Sex = 2
	}

	if p.IsDorm {
		u.Residence = 1
	} else {
		u.Residence = 2
	}

	u.BirthYear = p.BirthdayYear
	u.BirthMonth = p.BirthdayMonth
	u.BirthDay = p.BirthdayDay

	u.UpdatedAt = time.Now()

	conn := c.Get("conn").(*pg.Conn)
	if err := u.UpdateV1(conn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}

func patchUserRoles(c echo.Context) error {
	id := c.Param("user_id")
	if id == "" {
		return echo.ErrBadRequest
	}

	p := struct {
		Roles string
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	conn := c.Get("conn").(*pg.Conn)
	u, err := models.UserByID(conn, id)
	if err != nil {
		return echo.ErrInternalServerError
	}

	// edit or add admin is banned
	if strings.Contains(p.Roles+u.Roles, "admin,") {
		return echo.ErrBadRequest
	}

	u.Roles = p.Roles

	if err := u.UpdateRoles(conn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}

func getUsersByName(c echo.Context) error {
	limit, err := strconv.Atoi(c.QueryParam("limit"))
	if err != nil || limit > 100 {
		limit = LimitDefault // default
	}
	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil || page <= 0 {
		page = 1 // default
	}

	name := c.Param("name")
	if name == "" {
		return echo.ErrBadRequest
	}

	orderBy := c.Param("order-by")

	conn := c.Get("conn").(*pg.Conn)
	us, err := models.UsersLikeName(conn, name, orderBy, limit, page)
	if err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(200, us)
}

func getUsersAllCount(c echo.Context) error {
	conn := c.Get("conn").(*pg.Conn)
	count, err := models.UsersAllCount(conn)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, Map{
		"Count": strconv.Itoa(count),
	})
}

func getUsersAll(c echo.Context) error {
	limit, err := strconv.Atoi(c.QueryParam("limit"))
	if err != nil || limit > 100 {
		limit = LimitDefault // default
	}
	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil || page <= 0 {
		page = 1 // default
	}

	orderBy := c.Param("order-by")

	conn := c.Get("conn").(*pg.Conn)
	us, err := models.UsersAllOptions(conn, orderBy, limit, page)
	if err == pg.ErrNoRows || len(us) == 0 {
		log.Println("no rows")
		return echo.ErrNotFound
	} else if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, us)
}

func getUserUpgradable(c echo.Context) error {
	u := c.Get("user").(models.User)
	conn := c.Get("conn").(*pg.Conn)
	exists, err := models.UserUpgradeExistsByID(conn, u.ID)
	if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, Map{
		"Exists": exists,
	})
}

func postUserUpgrade(c echo.Context) error {
	u := c.Get("user").(models.User)
	p := struct {
		Grade, Class, Number int
	}{}
	if err := c.Bind(&p); err != nil {
		return echo.ErrBadRequest
	}

	// if grade was not increased
	if u.Grade >= p.Grade {
		return apierror.ApiError{
			StatusCode: 400,
			ErrorCode:  -500,
			Message:    "잘못된 학번입니다.",
		}.Send(c)
	}

	u.Grade = p.Grade
	u.Class = p.Class
	u.Number = p.Number
	if err := u.ValidateUserRegister(); err != nil {
		return err.Send(c)
	}

	conn := c.Get("conn").(*pg.Conn)
	if err := u.UpgradeHakbun(conn); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}
