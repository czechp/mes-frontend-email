const userRoleTranslator = (role) => {
    switch (role) {
        case "ADMIN":
            return "administrator"
        case "USER":
            return "użytkownik"
        default:
            return "nie rozpoznano"
    }
}

const translators = {
    userRoleTranslator
}

export default translators