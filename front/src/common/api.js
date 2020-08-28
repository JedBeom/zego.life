import axios from "axios"
import dietMake from "../utils/dietMake"

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
    let key = "d2u-" + userID + "-" + id
    let item = localStorage.getItem(key)
    if (item != null) {
        return item === "true"
    }

    const {data} = await axios.get(`users/${userID}/diet2user/${id}`)
    localStorage.setItem(key, data.Applied)
    return data.Applied
}

export {getDietByDate, getD2UByDiet}