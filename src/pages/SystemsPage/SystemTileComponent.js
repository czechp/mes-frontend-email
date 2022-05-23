import { useHistory } from "react-router"
import "./SystemsPage.css"

const SystemTile = ({ title, subtitle = "", endpoint = "/" }) => {
    const history = useHistory()

    return (
        <div className="system-tile" onClick={() => history.push(endpoint)}>
            <h1>{title}</h1>
            <h5>{subtitle}</h5>
        </div>
    )
}

export default SystemTile