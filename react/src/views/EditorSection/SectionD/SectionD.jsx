import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionD.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"

function SectionD() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()

    return(
        <>
            <EditHeader
                currentSection={3}
            />
            <div id="section-D" className="section">
                <div className="section-header wrapper">
                    <h1>D. CHUẨN ĐẦU RA VÀ TRÌNH ĐỘ NĂNG LỰC</h1>
                </div>
            </div>
            <EditFooter
                currentSection={3}
            />
        </>
    )
}

export default SectionD