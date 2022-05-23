import { useEffect, useState } from "react";
import isLogged, { loginSubject } from "../../services/authorizationService";
import "./TopBarComponent.css"
import UserLoginComponent from "./UserLoginComponent";
import UserLogoutComponent from "./UserLogoutComponent";


const TopBarComponent = () => {

    const [reload, setReload] = useState(false)

    const userInfoSectionStyle = {
        width: "205.65px"
    }


    useEffect(() => {
        const loginSubscriber = loginSubject.subscribe({
            next: () => {
                setReload(!reload)
            }
        })

        return () => {
            loginSubscriber.unsubscribe()
        }
    }, [reload])


    return (
        <div className="top-bar">
            <h1>Logo</h1>
            <h1>Powiadomienia e-mail</h1>
            <div className="" style={userInfoSectionStyle}>
                {isLogged() ? (<UserLoginComponent />) : (<UserLogoutComponent />)}
            </div>
        </div>
    )
}




export default TopBarComponent