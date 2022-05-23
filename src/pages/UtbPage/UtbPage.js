import axios from "axios"
import { useEffect, useState } from "react"
import { useContext } from "react"
import { TitleContext } from "../../App"
import EmailSectionComponent from "../../components/EmailSectionComponent/EmailSectionComponent"
import { BASE_URL } from "../../services/CONSTANTS"
import httpResponseHandler from "../../services/httpResponseHandler"
import statementEvent from "../../services/statementEvent"
const UtbPage = () => {
    const { setTitle } = useContext(TitleContext)
    const [emails, setEmails] = useState([])

    const getUtbEmails = () => {
        axios.get(BASE_URL + "/utb")
            .then((response) => {
                setEmails(response.data)
            })
            .catch((error) => {
                httpResponseHandler(error)
            })
    }


    const addNewEmail = (email, system) => {
        console.log(email, system)
        axios.post(BASE_URL + "/utb", { email, system })
            .then((response) => {
                statementEvent.next({ isError: false, content: `Email ${email} został dodany` })
                getUtbEmails()
            })
            .catch((error) => {
                httpResponseHandler(error)
            })
    }

    const addNewEmailSystemF = (email) => {
        addNewEmail(email, "F")
    }

    const addNewEmailSystemB = (email) => {
        addNewEmail(email, "B")
    }


    const addNewEmailSystemAS = (email) => {
        addNewEmail(email, "AS")
    }

    const deleteEmail = (emailId) => {
        axios.delete(BASE_URL + `/utb/${emailId}`)
            .then((response) => {
                statementEvent.next({ isError: false, content: "Adres email został usunięty z listy." })
                getUtbEmails()
            })
            .catch((error) => {
                httpResponseHandler(error)
            })
    }

    useEffect(() => {
        setTitle("UTB")
        getUtbEmails()
    }, [setTitle])



    return (
        <div className="page-wrapper" style={{ flexDirection: "column" }} >
            <EmailSectionComponent title="UTB-F" emails={emails.filter((e) => e.system === "F")} addNewEmail={addNewEmailSystemF} deleteEmail={deleteEmail}/>
            <EmailSectionComponent title="UTB-B" emails={emails.filter((e) => e.system === "B")} addNewEmail={addNewEmailSystemB} deleteEmail={deleteEmail}/>
            <EmailSectionComponent title="UTB-AS" emails={emails.filter((e) => e.system === "AS")} addNewEmail={addNewEmailSystemAS} deleteEmail={deleteEmail}/>
        </div>
    )
}


export default UtbPage