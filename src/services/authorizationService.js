import { Subject } from "rxjs"

let logged = sessionStorage.getItem("username") !== null

export const loginSubject = new Subject()

export const login = (username, authHash, email, role) => {
    logged = true
    sessionStorage.setItem("username", username)
    sessionStorage.setItem("authHash", authHash)
    sessionStorage.setItem("email", email)
    sessionStorage.setItem("role", role)
    loginSubject.next()

}

export const logout = () => {
    logged = false
    sessionStorage.removeItem("username")
    sessionStorage.removeItem("authHash")
    sessionStorage.removeItem("email")
    sessionStorage.removeItem("role")
    loginSubject.next()

}

export const isLogged = () => {
    return logged
}

export const getAuthToken = () => {
    return sessionStorage.getItem("authHash")
}



export const getUserRole = () => {
    return sessionStorage.getItem("role")
}

export default isLogged