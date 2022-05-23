import { useContext } from "react"
import { TitleContext } from "../../App"

const TitleComponent = () => {
    const {title} = useContext(TitleContext)

    const titleComponentStyle = {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        backgroundColor: "#6c757d",
        color: "white",
        minHeight: "100px",
        marginBottom: "0px"
    }
    return (
        <h1 style={titleComponentStyle}>{title}</h1>
    )
}


export default TitleComponent