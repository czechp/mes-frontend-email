import { Route } from "react-router-dom"
import ForbidenPage from "../../pages/ForbiddenPage/ForbidenPage";
import LoginPage from "../../pages/LoginPage/LoginPage";
import isLogged, { getUserRole } from "../../services/authorizationService";
import statementEvent from "../../services/statementEvent";

const AdminGuard = ({ component: Component, ...rest }) => {

    return (
        <Route {...rest} render={(props) => {
            if (isLogged()) {
                const userRole = getUserRole()
                if (userRole === "ADMIN")
                    return <Component {...props} />
                else
                    return <ForbidenPage />
            } else {
                statementEvent.next({ isError: true, content: "Musisz być zalogowany aby mięć dostęp." })
                return <LoginPage />
            }


        }} />
    )
}

export default AdminGuard