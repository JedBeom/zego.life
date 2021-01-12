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

const LIMIT_DEFAULT = 10

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
	if err := u.UpdateV1(db); err != nil {
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

	u, err := models.UserByID(db, id)
	if err != nil {
		return echo.ErrInternalServerError
	}

	// edit or add admin is banned
	if strings.Contains(p.Roles+u.Roles, "admin,") {
		return echo.ErrBadRequest
	}

	u.Roles = p.Roles
	if err := u.UpdateRoles(db); err != nil {
		return echo.ErrInternalServerError
	}

	return c.NoContent(200)
}

func getUsersByName(c echo.Context) error {
	limit, err := strconv.Atoi(c.QueryParam("limit"))
	if err != nil || limit > 100 {
		limit = LIMIT_DEFAULT // default
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

	us, err := models.UsersLikeName(db, name, orderBy, limit, page)
	if err != nil {
		log.Println(err)
		return echo.ErrInternalServerError
	}

	return c.JSON(200, us)
}

func getUsersAllCount(c echo.Context) error {
	count, err := models.UsersAllCount(db)
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
		limit = LIMIT_DEFAULT // default
	}
	page, err := strconv.Atoi(c.QueryParam("page"))
	if err != nil || page <= 0 {
		page = 1 // default
	}

	orderBy := c.Param("order-by")

	us, err := models.UsersAllOptions(db, orderBy, limit, page)
	if err == pg.ErrNoRows || len(us) == 0 {
		log.Println("norows")
		return echo.ErrNotFound
	} else if err != nil {
		return echo.ErrInternalServerError
	}

	return c.JSON(200, us)
}
