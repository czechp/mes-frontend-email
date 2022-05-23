import { Button } from "react-bootstrap"
import { useContext, useEffect } from "react"
import { TitleContext } from "../../App"
import InputFieldComponent from "../../components/InputFieldComponent/InputFieldComponent"
import "../../GlobalStyle.css"
import { useTextState } from "../../services/customHooks"
import axios from "axios"
import { BASE_URL } from "../../services/CONSTANTS"
import httpResponseHandler from "../../services/httpResponseHandler"
import statementEvent from "../../services/statementEvent"
import { login } from "../../services/authorizationService"
import { useHistory } from "react-router"

const LoginPage = () => {
    const { setTitle } = useContext(TitleContext)
    const [username, setUsername] = useTextState()
    const [password, setPassword] = useTextState()
    const history = useHistory()

    const dataValidated = username.validated && password.validated

    const loginUser = () => {
        axios.post(BASE_URL + "/users/login", { username: username.value, password: password.value })
            .then((response) => {
                statementEvent.next({ isError: false, content: "Użytkownik zalogowany." })
                const userInfo = response.data
                const authHash = "Basic " + btoa(username.value + ":" + password.value)
                login(username.value, authHash, userInfo.email, userInfo.role)
                history.push("/")
            })
            .catch((error) => {
                httpResponseHandler(error)
            })
    }



    useEffect(() => {
        setTitle("Logowanie")
    }, [setTitle])

    return (
        <div className="page-wrapper">
            <div className="form-wrapper">
                <InputFieldComponent value={username.value} label="Login:" assign={setUsername} />
                <InputFieldComponent type="password" value={password.value} label="Hasło:" assign={setPassword} />
                <Button variant="outline-success" disabled={!dataValidated} style={{marginBottom: "50px"}} onClick={() => loginUser()}>Login</Button>
                <hr />
                <Button variant="outline-primary" onClick={() => history.push("/register")}>Rejestracja</Button>

            </div>
        </div>
    )
}


export default LoginPage