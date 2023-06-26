import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionD.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import { useQuery } from "react-query"
import Loader from "../../../components/Loader/Loader"
import axios from "axios"
import { handleSplitSectionD } from "../Database/HandleActionSectionD"
import PLOSection from "./PLOSection.jsx"

function SectionD() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()
    const [ sectionDKienThucDHH, setSectionDKienThucDHH ] = useState({
        typeDetail: 'KIEN_THUC_DAI_HOC_HUE',
        data: [],
        max: 2
    })
    const [ sectionDKienThucDHKH, setSectionDKienThucDHKH ] = useState({
        typeDetail: 'KIEN_THUC_DAI_HOC_KHOA_HOC',
        data: [],
        max: 2
    })
    const [ sectionDKienThucLV, setSectionDKienThucLV ] = useState({
        typeDetail: 'KIEN_THUC_LINH_VUC',
        data: [],
        max: 1
    })
    const [ sectionDKienThucNN, setSectionDKienThucNN ] = useState({
        typeDetail: 'KIEN_THUC_NHOM_NGANH',
        data: [],
        max: 1
    })
    const [ sectionDKienThucN, setSectionDKienThucN ] = useState({
        typeDetail: 'KIEN_THUC_NGANH',
        data: [],
        max: 5
    })
    const [ sectionDKyNangCM, setSectionDKyNangCM ] = useState({
        typeDetail: 'KY_NANG_CHUYEN_MON',
        data: [],
        max: 5
    })
    const [ sectionDKyNangMem, setSectionDKyNangMem ] = useState({
        typeDetail: 'KY_NANG_MEM',
        data: [],
        max: 3
    })
    const [ sectionDThaiDoCN, setSectionDThaiDoCN ] = useState({
        typeDetail: 'THAI_DO_CA_NHAN',
        data: [],
        max: 2
    })
    const [ sectionDThaiDoNN, setSectionDThaiDoNN ] = useState({
        typeDetail: 'THAI_DO_NGHE_NGHIEP',
        data: [],
        max: 2
    })
    const [ sectionDThaiDoXH, setSectionDThaiDoXH ] = useState({
        typeDetail: 'THAI_DO_XA_HOI',
        data: [],
        max: 2
    })
    const [ deleteElement, setDeleteElement ] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    useEffect(() => {
        localStorage.setItem(`sectionD-${id}`, JSON.stringify([
            ...sectionDKienThucDHH.data,
            ...sectionDKienThucDHKH.data,
            ...sectionDKienThucLV.data,
            ...sectionDKienThucNN.data,
            ...sectionDKienThucN.data,
            ...sectionDKyNangCM.data,
            ...sectionDKyNangMem.data,
            ...sectionDThaiDoCN.data,
            ...sectionDThaiDoNN.data,
            ...sectionDThaiDoXH.data
        ]))
        localStorage.setItem(`sectionD-delete-${id}`, JSON.stringify(deleteElement))
    })

    const fecthAPI = (id) => {
        // const sectionDValueApi = `${apiURL}/sectionD/${id}`
        const sectionDValueApi = `${fakeApi}/sectionD/${id}`
        return async () => {
            await axios.get(sectionDValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data)
                        handleSplitSectionD({ 
                            data: restData.data,
                            setSectionDKienThucDHH,
                            setSectionDKienThucDHKH,
                            setSectionDKienThucLV,
                            setSectionDKienThucN,
                            setSectionDKienThucNN,
                            setSectionDKyNangCM,
                            setSectionDKyNangMem,
                            setSectionDThaiDoCN,
                            setSectionDThaiDoNN,
                            setSectionDThaiDoXH
                        })
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
        }
    }

    const { isLoading, isError} = useQuery(`sectionD-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    return(
        <>
            <EditHeader
                currentSection={3}
            />
            <div id="section-D" className="section">
                <div className="section-header wrapper">
                    <h1>D. CHUẨN ĐẦU RA VÀ TRÌNH ĐỘ NĂNG LỰC</h1>
                </div>
                <div className="section-D wrapper">
                    <p className="section-D-details">Viết theo từng chuẩn đầu ra, bao gồm các chủ đề chuẩn đầu ra và trình độ năng lực (TĐNL – tham khảo thêm tài liệu và thang trình độ năng lực kèm theo) mà chuẩn đầu ra yêu cầu khi sinh viên tốt nghiệp, PLO = Program Learning Outcomes.<br/><span style={{fontWeight: 600, fontSize: '14px'}}>Lưu ý: Dữ liệu chỉ được lưu lại khi bấm nút lưu hoặc nút hoàn tất. Khi đã xóa một mục tiêu cụ thể thì dữ liệu về mục tiêu đó ở ma trận mục tiêu - chuẩn đầu ra sẽ bị xóa. Vì vậy, hãy cẩn trọng trước khi lưu lại những thao tác đó!</span></p>
                    <div className="section-D-main">
                        <div className="section-D-block" id="KIEN_THUC">
                            <h1>1. CHUẨN VỀ KIẾN THỨC</h1>
                            <PLOSection
                                type={'KIEN_THUC'}
                                idCTDT={id}
                                data={sectionDKienThucDHH}
                                setState={setSectionDKienThucDHH}
                                setDelete={setDeleteElement}
                            />
                            <PLOSection
                                type={'KIEN_THUC'}
                                idCTDT={id}
                                data={sectionDKienThucDHKH}
                                setState={setSectionDKienThucDHKH}
                                setDelete={setDeleteElement}
                            />
                            <PLOSection
                                type={'KIEN_THUC'}
                                idCTDT={id}
                                data={sectionDKienThucLV}
                                setState={setSectionDKienThucLV}
                                setDelete={setDeleteElement}
                            />
                            <PLOSection
                                type={'KIEN_THUC'}
                                idCTDT={id}
                                data={sectionDKienThucNN}
                                setState={setSectionDKienThucNN}
                                setDelete={setDeleteElement}
                            />
                            <PLOSection
                                type={'KIEN_THUC'}
                                idCTDT={id}
                                data={sectionDKienThucN}
                                setState={setSectionDKienThucN}
                                setDelete={setDeleteElement}
                            />
                        </div>
                        <div className="section-D-block" id="KY_NANG">
                            <h1>2. CHUẨN VỀ KỸ NĂNG</h1>
                            <PLOSection
                                type={'KY_NANG'}
                                idCTDT={id}
                                data={sectionDKyNangCM}
                                setState={setSectionDKyNangCM}
                                setDelete={setDeleteElement}
                            />
                            <PLOSection
                                type={'KY_NANG'}
                                idCTDT={id}
                                data={sectionDKyNangMem}
                                setState={setSectionDKyNangMem}
                                setDelete={setDeleteElement}
                            />
                        </div>
                        <div className="section-D-block" id="THAI_DO">
                            <h1>3. CHUẨN VỀ THÁI ĐỘ</h1>
                            <PLOSection
                                type={'THAI_DO'}
                                idCTDT={id}
                                data={sectionDThaiDoCN}
                                setState={setSectionDThaiDoCN}
                                setDelete={setDeleteElement}
                            />
                            <PLOSection
                                type={'THAI_DO'}
                                idCTDT={id}
                                data={sectionDThaiDoNN}
                                setState={setSectionDThaiDoNN}
                                setDelete={setDeleteElement}
                            />
                            <PLOSection
                                type={'THAI_DO'}
                                idCTDT={id}
                                data={sectionDThaiDoXH}
                                setState={setSectionDThaiDoXH}
                                setDelete={setDeleteElement}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <EditFooter
                currentSection={3}
            />
        </>
    )
}

export default SectionD