import { Route } from "react-router-dom"
import LoginPage from "../../pages/LoginPage/LoginPage"
import isLogged, { logout } from "../../services/authorizationService"
import statementEvent from "../../services/statementEvent"


const LoginGuard = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            if (isLogged()) {
                return <Component {...props} />
            } else {
                logout()
                statementEvent.next({ isError: true, content: "Musisz być zalogowany aby mięć dostęp." })
                return <LoginPage />
            }
        }} />
    )
}


export default LoginGuard