import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionE.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"

function SectionE() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()

    return(
        <>
            <EditHeader
                currentSection={4}
            />
            <div id="section-D" className="section">
                <div className="section-header wrapper">
                    <h1>E. MA TRẬN ĐẦU RA ĐỐI VỚI MỤC TIÊU</h1>
                </div>
            </div>
            <EditFooter
                currentSection={4}
            />
        </>
    )
}

export default SectionE