let roles = localStorage.getItem("me.roles")
if (roles === null || roles === undefined) {
    roles = []
} else {
    roles = roles.split(",")
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

export {isAdmin, isOBT, isThat}