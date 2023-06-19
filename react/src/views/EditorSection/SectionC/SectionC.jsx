import { useContext, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionC.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import Loader from "../../../components/Loader/Loader"
import { useQuery } from "react-query"
import axios from "axios"
import POBlock from "./POBlock"

function SectionC() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()
    const [ sectionCKienThuc, setSectionCKienThuc ] = useState([])
    const [ sectionCKyNang, setSectionCKyNang ] = useState([])
    const [ sectionCThaiDo, setSectionCThaiDo ] = useState([])

    const sortCondition = (a, b) => a.kiHieu < b.kiHieu ? -1 : 1

    const fecthAPI = (id) => {
        // const sectionBValueApi = `${apiURL}/mainList`
        const sectionCValueApi = `${fakeApi}/sectionC/${id}`
        return async () => {
            await axios.get(sectionCValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data)
                    {
                        const KIEN_THUC = restData.data.filter(item => item.loaiMucTieu === 'KIEN_THUC')
                        KIEN_THUC.sort(sortCondition)
                        setSectionCKienThuc(KIEN_THUC)

                        const KY_NANG = restData.data.filter(item => item.loaiMucTieu === 'KY_NANG')
                        KY_NANG.sort(sortCondition)
                        setSectionCKyNang(KY_NANG)

                        const THAI_DO = restData.data.filter(item => item.loaiMucTieu === 'THAI_DO')
                        THAI_DO.sort(sortCondition)
                        setSectionCThaiDo(THAI_DO)
                    }
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
        }
    }

    const { isLoading, isError} = useQuery(`sectionC-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return(
        <>
            <EditHeader currentSection={2}/>
            <div id="section-C" className="section">
                <div className="section-header wrapper">
                    <h1>C. MỤC TIÊU CỤ THỂ</h1>
                </div>
                <div className="section-C wrapper">
                    <p className="section-C-details">Tối đa 05 mục tiêu cụ thể cho mỗi phần về kiến thức, kỹ năng và thái độ của sinh viên sau khi tốt nghiệp, PO = Program Objectives.<br/>Sinh viên sau khi tốt nghiệp có các kiến thức, kỹ năng và thái độ:</p>
                    <div className="section-C-main">
                        <POBlock
                            title = {'1. KIẾN THỨC'}
                            data = {sectionCKienThuc}
                            type = {'KIEN_THUC'}
                        />
                        <POBlock
                            title = {'2. KỸ NĂNG'}
                            data = {sectionCKyNang}
                            type = {'KY_NANG'}
                        />
                        <POBlock
                            title = {'3.THÁI ĐỘ'}
                            data = {sectionCThaiDo}
                            type = {'THAI_DO'}
                        />
                    </div>
                </div>
            </div>
            <EditFooter currentSection={2}/>
        </>
    )
}

export default SectionC