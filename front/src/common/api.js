import axios from "axios"
import dietMake from "../utils/dietMake"
import eventsMake from "../utils/eventsMake"

async function asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
    }
}

const getDietByDate = async (date) => {
    let key = "diet-" + date
    let item = localStorage.getItem(key)
    if (item != null) {
        return JSON.parse(item)
    }

    const resp = await axios.get("diets/" + date)
    let diets = []
    await asyncForEach(resp.data, d => {
        diets.push(dietMake(d))
    })
    localStorage.setItem(key, JSON.stringify(diets))
    return diets
}

const getD2UByDiet = async (id) => {
    let userID = localStorage.getItem("me.id")
    let applied = "0"
    try {
        const {data} = await axios.get(`users/${userID}/diet2user/${id}`)
        if (data.Applied) {
            applied = "1"
        }
    } catch (e) {
        applied = "2"
    }
    return applied
}

const getEvents = async () => {
    const {data} = await axios.get(`events`)

    return await eventsMake(data)
}

export {getDietByDate, getD2UByDiet, getEvents}