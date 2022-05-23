import { useState } from "react"
import { Form } from "react-bootstrap"
import { validate } from "email-validator"

const InputFieldComponent = ({ value, type = "text", label = "", placeholder = "", validators = { min: 2, max: 30 }, isEmail = false, assign = () => { } }) => {

    const [minValidator, setMinValidator] = useState(true)
    const [maxValidator, setMaxValidator] = useState(true)
    const [emailValidator, setEmailValidator] = useState(true)

    const labelStyle = {
        fontSize: "larger",
        marginBottom: "5px"
    }

    const inputFieldStyle = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
        marginBottom: "10px",
        marginTop: "10px"
    }

    const formControlStyle = {
        borderRadius: "5px",
        minHeight: "25px",
        marginBottom: "10px",
        textAlign: "center"
    }

    const alertsStyle = {
        color: "red",
        fontSize: "larger"
    }

    const onChange = (event) => {
        let validated = false

        const text = event.target.value
        const dataValidated = text.length >= validators.min && text.length <= validators.max

        if (isEmail) {
            const emailValidated = validate(text)
            validated = dataValidated && emailValidated
            setEmailValidator(emailValidated)
        } else {
            validated = dataValidated
        }
        setMinValidator(text.length >= validators.min)
        setMaxValidator(text.length <= validators.max)
        assign({ value: text, validated })
    }



    return (
        <Form style={{ width: "100%" }} >
            <Form.Group style={inputFieldStyle}>
                <Form.Label style={labelStyle}>{label}</Form.Label>
                <Form.Control style={formControlStyle} type={type} placeholder={placeholder} onChange={(event) => onChange(event)} value={value} />
                {
                    !minValidator && (
                        <Form.Text><span style={alertsStyle}>Tekst musi mieć przynajmniej {validators.min} znaków</span></Form.Text>
                    )
                }
                {
                    !maxValidator && (
                        <Form.Text><span style={alertsStyle}>Tekst może mieć maksymalnie {validators.max} znaków</span></Form.Text>
                    )
                }
                {
                    !emailValidator &&(
                        <Form.Text><span style={alertsStyle}>To nie jest poprawny format adresu email</span></Form.Text>

                    ) 
                }
            </Form.Group>
        </Form>
    )
}

export default InputFieldComponent