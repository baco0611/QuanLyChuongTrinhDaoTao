import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionC.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"

function SectionC() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()

    return(
        <>
            <EditHeader
                currentSection={2}
            />
            <div id="section-C" className="section">
                <div className="section-header wrapper">
                    <h1>C. MỤC TIÊU CỤ THỂ</h1>
                </div>
            </div>
            <EditFooter
                currentSection={2}
            />
        </>
    )
}

export default SectionC