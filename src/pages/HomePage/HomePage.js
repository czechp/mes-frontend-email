import { useContext, useEffect } from "react"
import { TitleContext } from "../../App"

const HomePage = () => {
    const { setTitle } = useContext(TitleContext)

    useEffect(() => {
        setTitle("Wybierz system:")
    }, [setTitle])

    return (
        <div className="page-wrapper">
            
        </div>
    )
}

export default HomePage
