import { Button } from "react-bootstrap"
import { useHistory } from "react-router"
import { logout } from "../../services/authorizationService"
import translators from "../../utilities/translators"

const UserLoginComponent = () => {
    const history = useHistory()

    const logoutUser = () => {
        logout()
        history.push("/login")
    }

    const userLoggedStyle = {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <div className="" style={userLoggedStyle}>
            <span><b>{sessionStorage.getItem("username")}</b></span>
            <span style={{ fontSize: "small" }}>{translators.userRoleTranslator(sessionStorage.getItem("role"))}</span>
            <span style={{ fontSize: "small" }}>{sessionStorage.getItem("email")}</span>
            <Button style={{ marginTop: "10px", width: "80%" }} size="sm" variant="outline-danger" onClick={() => { logoutUser() }}>Wyloguj</Button>
        </div>
    )
}

export default UserLoginComponent