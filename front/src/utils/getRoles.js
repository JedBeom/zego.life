let roles = localStorage.getItem("me.roles")
if (roles === null || roles === undefined) {
    roles = []
} else {
    roles = roles.split(",")
}

let user = null
if (localStorage.getItem("token") !== null) {
    user = true
}

const isUser = () => {
    return user
}

const admin = roles.includes("admin")
const isAdmin = () => {
    return admin
}

const obt = roles.includes("obt")
const isOBT = () => {
    return obt
}

const isThat = role => {
    return roles.includes(role)
}

export {isUser, isAdmin, isOBT, isThat}