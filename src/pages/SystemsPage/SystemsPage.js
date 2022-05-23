import { useContext, useEffect } from "react"
import { TitleContext } from "../../App"
import SystemTile from "./SystemTileComponent"

const SystemsPage = () => {
    const { setTitle } = useContext(TitleContext)

    useEffect(() => {
        setTitle("Wybierz system: ")
    }, [setTitle])

    return (
        <div className="page-wrapper system-page-content">
            <SystemTile title="MES" subtitle="System monitorowania produkcji - kontrola jakości" endpoint="/mes-quality-control" />
            <SystemTile title="MES" subtitle="System monitorowania produkcji - awarie" endpoint="/mes-breakdown" />
            <SystemTile title="UTB" subtitle="System monitorowania ładowania wózków"  endpoint="/utb"/>

        </div>
    )
}

export default SystemsPage