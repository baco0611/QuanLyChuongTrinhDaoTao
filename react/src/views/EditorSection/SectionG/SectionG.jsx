import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionG.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"

function SectionG() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()

    return(
        <>
            <EditHeader
                currentSection={5}
            />
            <div id="section-D" className="section">
                <div className="section-header wrapper">
                    <h1>G. KHUNG CHƯƠNG TRÌNH ĐÀO TẠO</h1>
                </div>
            </div>
            <EditFooter
                currentSection={5}
            />
        </>
    )
}

export default SectionG