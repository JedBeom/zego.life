let roles = localStorage.getItem("me.roles")
if (roles === null || roles === undefined) {
    roles = []
} else {
    roles = roles.split(",")
}

const isAdmin = () => {
    return roles.includes("admin")
}

const isOBT = () => {
    return roles.includes("obt")
}

export {isAdmin, isOBT}