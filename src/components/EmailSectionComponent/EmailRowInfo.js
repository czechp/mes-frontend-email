import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faWindowClose } from "@fortawesome/free-solid-svg-icons"
import "./EmailSectionComponent.css"

const EmailRowInfo = ({ email, deleteEmail = () => { } }) => {

    const onDeleteEmail = () => {
        deleteEmail(email.id)
    }

    return (
        <div className="email-info-row">
            <div className="">
                <p style={{ fontSize: "small" }}>Id: {email.id}</p>
                <p>Email: {email.email}</p>
            </div>
            <div className="">
                <div className="email-info-row-delete">
                    <FontAwesomeIcon style={{ cursor: "pointer" }} icon={faWindowClose} onClick={() => onDeleteEmail()} size="2x" color="red" />
                </div>
            </div>
        </div>
    )
}

export default EmailRowInfo