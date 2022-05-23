import { useEffect, useState } from "react"
import statementEvent from "../../services/statementEvent"

const StatementComponent = () => {
    const [statement, setStatement] = useState({
        isError: false,
        content: ""
    })

    const statementStyle = {
        background: statement.isError ? "red" : "green",
        position: "fixed",
        bottom: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        minHeight: "100px",
        opacity: 0.7,
        fontSize: "x-large"
    }

    useEffect(() => {
        statementEvent.subscribe({
            next: (value) => {
                setStatement(value)
                setTimeout(() => {
                    setStatement({isError: false, content: ""})
                }, 5000)
            }
        })
    }, [])


    return (
        <div className="">
            {statement.content.length > 0 && (
                <div className="" style={statementStyle}>
                    {statement.content}
                </div>
            )}
        </div>
    )
}




export default StatementComponent