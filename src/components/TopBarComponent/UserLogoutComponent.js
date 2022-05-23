import { Button } from "react-bootstrap"
import { useHistory } from "react-router"

const UserLogoutComponent = () => {
    const history = useHistory()
    const userLogoutComponentStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }
    return (
        <div className="" style={userLogoutComponentStyle}>
            <Button variant="outline-light" style={{marginTop: "0px", marginBottom: "0px", width: "100%"}} onClick={()=>{history.push("/login")}}>Logowanie</Button>
        </div>
    )
}

export default UserLogoutComponent