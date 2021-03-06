import axios from "axios"
import dietMake from "../utils/dietMake"
import {eventsMake} from "../utils/eventsMake"
import {timestampHyphen} from '../utils/timestamp'
import htmlDecode from '../utils/htmlDecode'
import ddayMake from "../utils/ddayMake"

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

export const getDietByDate = async (date) => {
    let key = "diet/" + date
    let item = sessionStorage.getItem(key)
    if (item != null) {
        return JSON.parse(item)
    }

    const resp = await axios.get("diets/" + date)
    let diets = []
    await asyncForEach(resp.data, d => {
        diets.push(dietMake(d))
    })
    sessionStorage.setItem(key, JSON.stringify(diets))
    return diets
}

export const getD2UByDiet = async (id) => {
    let userID = localStorage.getItem("me.id")

    let key = `d2u/${userID}/${id}`

    let item = sessionStorage.getItem(key)
    if (item != null) {
        return item
    }

    let applied = "0"
    try {
        const {data} = await axios.get(`users/${userID}/diet2user/${id}`)
        if (data.Applied) {
            applied = "1"
        }
    } catch (e) {
        applied = "2"
    }
    if (applied !== "2") {
        sessionStorage.setItem(key, applied)
    }

    return applied
}

export const getEvents = async (year, month) => {
    let key = `events-month/${year}/${month}`
    let item = sessionStorage.getItem(key)
    let data
    if (item != null) {
        data = JSON.parse(item)
    } else {
        const resp = await axios.get(`events/${year}/${month}`)
        data = resp.data
        sessionStorage.setItem(key, JSON.stringify(data))
    }

    return await eventsMake(data)
}

export const getEventsByDate = async date => {
    let key = `events-date/${date}`
    let item = sessionStorage.getItem(key)
    if (item != null) {
        return JSON.parse(item)
    }

    const {data} = await axios.get(`events/${date}`)
    if (data === null) {
        sessionStorage.setItem(key, JSON.stringify([]))
        return []
    }
    sessionStorage.setItem(key, JSON.stringify(data))
    return data
}

export const getEventsDateOnly = async () => {
    let key = `events-date-only/${timestampHyphen(new Date())}`
    let item = sessionStorage.getItem(key)
    if (item != null) {
        return JSON.parse(item)
    }

    const {data} = await axios.get(`events/date-only`)
    sessionStorage.setItem(key, JSON.stringify(data))
    return data
}

export const getDietReviewPossible = async id => {
    let userID = localStorage.getItem("me.id")
    let key = `diet-reviews/${userID}/${id}`

    let item = sessionStorage.getItem(key)
    if (item != null) {
        return JSON.parse(item)
    }

    let {data} = await axios.get(`diet-reviews/${id}`)
    let dietList = htmlDecode(data.Content).replace(/(\d?\d\.){1,}/g, "").split("\n")

    sessionStorage.setItem(key, JSON.stringify(dietList))
    return dietList
}

export const getTimetable = async (history) => {
    let key = `timetables/me/20210309`
    let item = sessionStorage.getItem(key)
    if (item != null) {
        return JSON.parse(item)
    }

    let datas = {}
    try {
        const {data} = await axios.get(`timetables/me`)
        datas = data.ReplaceTable
    } catch (e) {
        if (e.response.status === 404) {
            history.push("/timetable/set-credit")
            return
        }
        throw e
    }

    sessionStorage.setItem(key, JSON.stringify(datas))
    return datas
}

export const getTimetableTemplate = async (meGrade, meClass) => {
    let key = `timetables/${meGrade}-${meClass}/20210309`
    let item = sessionStorage.getItem(key)
    if (item != null) {
        return JSON.parse(item)
    }
    const {data} = await axios.get(`timetable-templates/${meGrade}/${meClass}`)
    sessionStorage.setItem(key, JSON.stringify(data.Lessons))
    return data.Lessons
}

export const getDDay = async () => {
    let today = new Date()
    let key = `dday-events/${timestampHyphen(today)}`
    let item = sessionStorage.getItem(key)
    if (item != null) {
        return ddayMake(JSON.parse(item), today)
    }

    let grade = localStorage.getItem("me.grade")
    if (grade === null) grade = -1
    const {data} = await axios.get(`dday-events/${grade}`)
    sessionStorage.setItem(key, JSON.stringify(data))
    return ddayMake(data, today)
}