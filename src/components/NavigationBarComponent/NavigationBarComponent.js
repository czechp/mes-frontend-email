import { Button } from "react-bootstrap"
import { useHistory } from "react-router"
const NavigationBarComponent = () => {
    const history = useHistory()
    
    const navigationBarStyle = {
        display: "flex",
        justifyContent: "space-around",
        width: "100%",
        minHeight: "50px",
        backgroundColor: "#232424",
        padding: "10px",
        marginTop: "3px"
    }

    const navigationElementStyle = {
        marginTop: "0px",
        width: "15%"
    }
    return (
        <div className="" style={navigationBarStyle}>
            <Button onClick={() => history.push("/")} variant="outline-light" style={navigationElementStyle}>Systemy</Button>
            <Button onClick={()=>{history.push("/users")}} variant="outline-light" style={navigationElementStyle}>Użytkownicy</Button>

        </div>
    )
}


export default NavigationBarComponent