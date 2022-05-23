import { useState } from "react"
import { Form } from "react-bootstrap"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTrash } from "@fortawesome/free-solid-svg-icons"
import { Button } from "react-bootstrap"
import ModalDialogComponent from "../../components/ModalDialogComponent/ModalDialogComponent"

const UserDetailRow = ({ user, deleteUser, changeUserState, changeUserRole }) => {
    const [deleteModal, setDeleteModal] = useState(false)
    const userDetailRowStyle = {
        width: "50%",
        border: "2px solid white",
        minHeight: "150px",
        borderRadius: "10px",
        marginTop: "20px",
        padding: "10px"
    }

    const confirmDeleteUser = () => {
        deleteUser(user.id)
        setDeleteModal(false)
    }

    const onChangeAccountState = (value) => {
        changeUserState(user.id, value)
    }

    const onChangeUserRole = (value) => {
        changeUserRole(user.id, value)
    }

    return (
        <div className="" style={userDetailRowStyle}>
            <p style={{ fontSize: "small" }}>Id: <i>{user.id}</i></p>
            <p style={{ display: "flex", justifyContent: "space-between" }}>
                <span>Login: <i>{user.username}</i></span>
                <span>Email: <i>{user.email}</i></span>
            </p>
            <p>
                Typ konta:
                <Form.Select value={user.role} onChange={(event) => { onChangeUserRole(event.target.value) }}>
                    <option value="ADMIN">Administrator</option>
                    <option value="USER">Użytkownik</option>
                </Form.Select>
            </p>
            <p>
                Stan konta:
                <Form.Select value={user.enable} onChange={(event) => { onChangeAccountState(event.target.value) }}>
                    <option value={true}>Aktywne</option>
                    <option value={false}>Zablokowane</option>
                </Form.Select>
            </p>

            <p style={{ display: "flex", justifyContent: "center" }}>
                <Button variant="outline-light" onClick={() => { setDeleteModal(true) }}><FontAwesomeIcon icon={faTrash} size="3x" color="red" /></Button>
            </p>

            <ModalDialogComponent
                visibility={deleteModal}
                header={`Potwierdzenie usunięcia konta ${user.username}`}
                body="Czy napewno chcesz usunąć konto? Zmiany bedą nieodwracalne."
                acceptFunction={() => confirmDeleteUser()}
                declineFunction={() => setDeleteModal(false)}

            />
        </div>
    )
}

export default UserDetailRow