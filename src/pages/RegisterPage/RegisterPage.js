import { useContext, useEffect } from "react"
import { TitleContext } from "../../App"
import { Button } from "react-bootstrap"
import InputFieldComponent from "../../components/InputFieldComponent/InputFieldComponent"
import { useTextState } from "../../services/customHooks"
import axios from "axios"
import { BASE_URL } from "../../services/CONSTANTS"
import statementEvent from "../../services/statementEvent"
import httpResponseHandler from "../../services/httpResponseHandler"
import { useHistory } from "react-router"

const RegisterPage = () => {
    const { setTitle } = useContext(TitleContext)
    const history = useHistory()

    const [username, setUsername] = useTextState()
    const [password, setPassword] = useTextState()
    const [passwordConf, setPasswordConf] = useTextState()
    const [email, setEmail] = useTextState()

    const fieldsValidated = username.validated && password.validated && passwordConf.validated && email.validated
    const passwordEqual = password.value === passwordConf.value

    const dataValidated = fieldsValidated && passwordEqual

    const userRegister = () => {
        if (dataValidated) {
            const regsiterBody = {
                username: username.value,
                password: password.value,
                passwordConf: passwordConf.value,
                email: email.value
            }
            axios.post(BASE_URL + "/users/register", regsiterBody)
                .then((response => {
                    statementEvent.next({ isError: false, content: "Rejestracja zakończona sukcesem. Napisz na pczech@bispol.pl aby aktywować konto." })
                    setTimeout(() => {
                        history.push("/login")
                    }, 2000)
                }))
                .catch((error) => {
                    httpResponseHandler(error)
                })
        }
    }

    useEffect(() => {
        setTitle("Rejestracja")

    }, [setTitle])
    return (
        <div className="page-wrapper">
            <div className="form-wrapper">
                <InputFieldComponent label="Login:" placeholder="Podaj swój login" value={username.value} assign={setUsername} />
                <InputFieldComponent label="Email:" placeholder="Podaj swój email" value={email.value} isEmail assign={setEmail} validators={{ min: 2, max: 30 }} />
                <InputFieldComponent label="Hasło:" placeholder="Podaj swoje hasło" value={password.value} type="password" assign={setPassword} />
                <InputFieldComponent label="Potwierdź hasło:" placeholder="Potwierdź swoje hasło" value={passwordConf.value} type="password" assign={setPasswordConf} />
                {!passwordEqual && (
                    <h5 style={{ textAlign: "center", color: "red" }}>
                        Hasła nie są identyczne !!!
                    </h5>
                )}
                <Button variant="outline-primary" disabled={!dataValidated} onClick={() => userRegister()}>Rejestracja</Button>
            </div>
        </div>
    )
}


export default RegisterPage