import statementEvent from "./statementEvent"

const httpResponseHandler = (error) => {
    let statement = { isError: true, content: "Niezidentyfikowany błąd. Kontakt z pczech@bispol.pl." }
    if (error.response) {
        switch (error.response.status) {
            case 401:
                statement.content = "Niepoprawne dane logowania lub Twoje konto jest zablokowane."
                break
            case 404:
                statement.content = "Taki adres nie istnieje. Kontakt z pczech@bispol.pl"
                break
            default:
                statement.content = error.response.data.message
        }
    }

    statementEvent.next(statement)
}

export default httpResponseHandler