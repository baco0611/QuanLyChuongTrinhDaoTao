import { useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionH.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"

function SectionH() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()

    return(
        <>
            <EditHeader
                currentSection={6}
            />
            <div id="section-D" className="section">
                <div className="section-header wrapper">
                    <h1>H. MA TRẬN HỌC PHẦN ĐỐI VỚI CHUẨN ĐẦU RA</h1>
                </div>
            </div>
            <EditFooter
                currentSection={6}
            />
        </>
    )
}

export default SectionH