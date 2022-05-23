
import axios from "axios"
import isLogged, { getAuthToken } from "./authorizationService"

const configureInterceptors = () => {
    axios.interceptors.request.use((config) => {
        if (isLogged()) {
            config.headers.Authorization = getAuthToken()
        }
        return config
    })

}


export default configureInterceptors
