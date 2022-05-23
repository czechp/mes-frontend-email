import "./EmailSectionComponent.css"
import { useTextState } from "../../services/customHooks"
import EmailRowInfo from "./EmailRowInfo"
import InputFieldComponent from "../../components/InputFieldComponent/InputFieldComponent"
import { Button } from "react-bootstrap"

const EmailSectionComponent = ({ title = "", emails = [], addNewEmail = () => { }, deleteEmail = () => { } }) => {
    const [newEmail, setNewEmail] = useTextState("@bispol.pl")

    const onAddNewEmail = () => {
        addNewEmail(newEmail.value)
    }

    return (
        <div className="email-section">
            <h3 style={{ textAlign: "center" }}>{title}</h3>

            <div className="content-center">
                <div className="form-wrapper" >
                    <InputFieldComponent value={newEmail.value} placeholder="Wpisz adres email" label="Dodaj email:" isEmail assign={setNewEmail} />
                    <Button style={{ marginTop: "30px", marginBottom: "30px" }}
                        variant="outline-success"
                        disabled={!newEmail.validated}
                        onClick={() => { onAddNewEmail() }}>Dodaj</Button>
                </div>
            </div>


            <div className="content-center">
                <div className="email-section-list" >
                    {
                        emails.map(e => <EmailRowInfo email={e} deleteEmail={deleteEmail} />)
                    }
                </div>
            </div>
            <hr />
        </div>
    )
}

export default EmailSectionComponent