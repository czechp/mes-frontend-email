import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { TitleContext } from "../../App"
import { BASE_URL } from "../../services/CONSTANTS"
import httpResponseHandler from "../../services/httpResponseHandler"
import statementEvent from "../../services/statementEvent"
import UserDetailRow from "./UserDetailRow"

const UserManagmentPage = () => {
    const { setTitle } = useContext(TitleContext)
    const [users, setUsers] = useState([])

    const UserManagmentPageStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
    }

    const deleteUser = (userId) => {
        axios.delete(BASE_URL + "/users/" + userId)
            .then((response) => {
                statementEvent.next({ isError: false, content: "Konto zostało usunięte." })
                getUsers()
            })
            .catch((error) => {
                httpResponseHandler(error)
            })
    }

    const changeUserState = (userId, accountState) => {
        axios.patch(BASE_URL + "/users/" + userId + "/enable/", {}, {
            params: { enable: accountState }
        })
            .then((response => {
                statementEvent.next({ isError: false, content: "Konto użytkownika zostało zauktualizowane" })
                getUsers()
            }))
            .catch((error) => {
                httpResponseHandler(error)
            })
    }

    const changeUserRole = (userId, userRole) => {
        axios.patch(BASE_URL + `/users/${userId}/role`, {}, {
            params: { role: userRole }
        })
            .then((response) => {
                statementEvent.next({ isError: false, content: "Konto użytkownika zostało zauktualizowane" })
                getUsers()
            })
            .catch((error) => {
                httpResponseHandler(error)
            })
    }

    const getUsers = () => {
        axios.get(BASE_URL + "/users")
            .then((response) => {
                setUsers(response.data)
            })
            .catch((error) => {
                httpResponseHandler(error)
            })
    }



    useEffect(() => {
        setTitle("Użytkownicy")
        getUsers()
    }, [setTitle])

    return (
        <div className="" style={UserManagmentPageStyle}>
            {
                users.map(u => <UserDetailRow key={u.id} user={u} deleteUser={deleteUser} changeUserState={changeUserState} changeUserRole={changeUserRole} />)
            }
        </div>
    )
}

export default UserManagmentPage