import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"

function SectionA() {

    const { id } = useParams()
    const { currentId , setCurrentId } = useContext(UserContext)

    useEffect(() => {
        if(id != currentId)
            setCurrentId(id)
    }, [])

    return (
        <div>
            sectionA
        </div>
    )
}

export default SectionA