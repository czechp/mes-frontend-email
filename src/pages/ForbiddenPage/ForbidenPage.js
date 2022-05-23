const ForbidenPage = () => {
    const forbidenPageStyle = {
        marginTop: "100px",
        width: "50%",
        minHeight: "200px",
        border: "3px solid red",
        borderRadius: "5%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
    }

    return (
        <div className="" style={{ display: "flex", justifyContent: "center" }}>
            <div className="" style={forbidenPageStyle}>
                <h1>Nie masz uprawnień do tych zasobów</h1>
            </div>
        </div>
    )
}

export default ForbidenPage