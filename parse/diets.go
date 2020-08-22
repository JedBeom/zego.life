package parse

import (
	"strconv"
	"time"

	"github.com/go-pg/pg"

	sm "github.com/JedBeom/schoolmeal"
	"github.com/JedBeom/zego.life/models"
)

func parseWeeklyDiets(db *pg.DB, ts string) {
	for t := 1; t <= 3; t++ { // 1: Breakfast, 2: Lunch, 3: Dinner
		var err error
		for try := 0; try < 5; try++ { // try 5 times
			if err = parseAndCreateWeeklyTypeDiet(db, ts, t); err == nil {
				break // break if ok
			}
			time.Sleep(time.Second) // retry with the same parameters after 2 seconds
		}
		if err != nil { // if failed after all retries
			models.LogError(db, "", "", "parseWeeklyDiets()", err)
		}
	}
}

// ts(timestamp), t(mealType)
func parseAndCreateWeeklyTypeDiet(db *pg.DB, ts string, t int) (err error) {
	ms, err := s.GetWeekMeal(ts, t)
	if err != nil {
		return
	}

	for _, m := range ms {
		d := meal2Diet(m)
		err = d.Create(db)

		if err != nil {
			pgErr, ok := err.(pg.Error)
			if ok && pgErr.Field(models.ErrPgErrCodeField) == models.ErrPgUniqueViolation { // if err is unique violation
				continue
			}
			// if not,
			return // return to retry
		}
	}

	return nil
}

func GetMonthDiets(db *pg.DB, year, month int) {
	var err error
	for try := 0; try < 5; try++ { // try 5 times
		if err = parseAndCreateMonthDiet(db, year, month); err == nil {
			return // return if ok
		}
		time.Sleep(time.Second) // retry with the same parameters after 2 seconds
	}
	models.LogError(db, "", "", "parseMonthDiets()", err)
}

func parseAndCreateMonthDiet(db *pg.DB, year, month int) (err error) {
	mthMeals, err := s.GetMonthMeal(year, month)
	if err != nil {
		return
	}

	for _, weekMeals := range mthMeals {
		for _, m := range weekMeals {
			d := meal2Diet(m)
			err = d.Create(db)
			if err != nil {
				pgErr, ok := err.(pg.Error)

				if ok && pgErr.Field(models.ErrPgErrCodeField) == models.ErrPgUniqueViolation { // if err is unique violation
					continue
				}
				return
			}
		}
	}

	return nil
}

// schoolmeal.Meal to models.Diet
func meal2Diet(m sm.Meal) models.Diet {
	d := models.Diet{
		Date:      m.Date,
		Timestamp: m.DateString,
		Type:      m.Type,
		Content:   m.Content,
	}

	d.ID = sm.Timestamp(m.Date) + "-" + strconv.Itoa(m.Type)
	return d
}
