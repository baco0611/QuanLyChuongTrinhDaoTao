import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionD.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import { useQuery } from "react-query"
import Loader from "../../../components/Loader/Loader"
import axios from "axios"
import { handleSplitSectionD, handleChangeDataD } from "../Database/HandleActionSectionD"
import PLOSection from "./PLOSection.jsx"
import { DragDropContext } from "react-beautiful-dnd"

function SectionD() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()
    const [ isHiddenA, setIsHiddenA ] = useState(true)
    const [ isHiddenB, setIsHiddenB ] = useState(true)
    const [ isHiddenC, setIsHiddenC ] = useState(true)
    const [ sectionDKienThucDHH, setSectionDKienThucDHH ] = useState({
        typeDetail: 'KIEN_THUC_DAI_HOC_HUE',
        data: []
    })
    const [ sectionDKienThucDHKH, setSectionDKienThucDHKH ] = useState({
        typeDetail: 'KIEN_THUC_DAI_HOC_KHOA_HOC',
        data: []
    })
    const [ sectionDKienThucLV, setSectionDKienThucLV ] = useState({
        typeDetail: 'KIEN_THUC_LINH_VUC',
        data: []
    })
    const [ sectionDKienThucNN, setSectionDKienThucNN ] = useState({
        typeDetail: 'KIEN_THUC_NHOM_NGANH',
        data: []
    })
    const [ sectionDKienThucN, setSectionDKienThucN ] = useState({
        typeDetail: 'KIEN_THUC_NGANH',
        data: []
    })
    const [ sectionDKyNangCM, setSectionDKyNangCM ] = useState({
        typeDetail: 'KY_NANG_CHUYEN_MON',
        data: []
    })
    const [ sectionDKyNangMem, setSectionDKyNangMem ] = useState({
        typeDetail: 'KY_NANG_MEM',
        data: []
    })
    const [ sectionDThaiDoCN, setSectionDThaiDoCN ] = useState({
        typeDetail: 'THAI_DO_CA_NHAN',
        data: []
    })
    const [ sectionDThaiDoNN, setSectionDThaiDoNN ] = useState({
        typeDetail: 'THAI_DO_NGHE_NGHIEP',
        data: []
    })
    const [ sectionDThaiDoXH, setSectionDThaiDoXH ] = useState({
        typeDetail: 'THAI_DO_XA_HOI',
        data: []
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
        const sectionDValueApi = `${apiURL}/sectionD/${id}`
        // const sectionDValueApi = `${fakeApi}/sectionD/${id}`
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
                            setSectionDThaiDoXH,
                            idCTDT: id
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

    const handleDragEnd = (results) => {
        console.log(results)
        const { source, destination, type } = results

        const PLOSelector = {
            KIEN_THUC_DAI_HOC_HUE: {
                data: sectionDKienThucDHH,
                setState: setSectionDKienThucDHH,
                type: 'KIEN_THUC',
                typeIndex: '1.1',
                typeDetail: 'KIEN_THUC_DAI_HOC_HUE'
            },
            KIEN_THUC_DAI_HOC_KHOA_HOC: {
                data: sectionDKienThucDHKH,
                setState: setSectionDKienThucDHKH,
                type: 'KIEN_THUC',
                typeIndex: '1.2',
                typeDetail: 'KIEN_THUC_DAI_HOC_KHOA_HOC'
            },
            KIEN_THUC_LINH_VUC: {
                data: sectionDKienThucLV,
                setState: setSectionDKienThucLV,
                type: 'KIEN_THUC',
                typeIndex: '1.3',
                typeDetail: 'KIEN_THUC_LINH_VUC'
            },
            KIEN_THUC_NHOM_NGANH: {
                data: sectionDKienThucNN,
                setState: setSectionDKienThucNN,
                type: 'KIEN_THUC',
                typeIndex: '1.4',
                typeDetail: 'KIEN_THUC_NHOM_NGANH'
            },
            KIEN_THUC_NGANH: {
                data: sectionDKienThucN,
                setState: setSectionDKienThucN,
                type: 'KIEN_THUC',
                typeIndex: '1.5',
                typeDetail: 'KIEN_THUC_NGANH'
            },
            KY_NANG_CHUYEN_MON: {
                data: sectionDKyNangCM,
                setState: setSectionDKyNangCM,
                type: 'KY_NANG',
                typeIndex: '2.1',
                typeDetail: 'KY_NANG_CHUYEN_MON'
            },
            KY_NANG_MEM: {
                data: sectionDKyNangMem,
                setState: setSectionDKyNangMem,
                type: 'KY_NANG',
                typeIndex: '2.2',
                typeDetail: 'KY_NANG_CHUYEN_MEM'
            },
            THAI_DO_CA_NHAN: {
                data: sectionDThaiDoCN,
                setState: setSectionDThaiDoCN,
                type: 'THAI_DO',
                typeIndex: '3.1',
                typeDetail: 'THAI_DO_CA_NHAN'
            },
            THAI_DO_NGHE_NGHIEP: {
                data: sectionDThaiDoNN,
                setState: setSectionDThaiDoNN,
                type: 'THAI_DO',
                typeIndex: '3.2',
                typeDetail: 'THAI_DO_NGHE_NGHIEP'
            },
            THAI_DO_XA_HOI: {
                data: sectionDThaiDoXH,
                setState: setSectionDThaiDoXH,
                type: 'THAI_DO',
                typeIndex: '3.3',
                typeDetail: 'THAI_DO_XA_HOI'
            }
        }

        if(!destination) return

        if(source.droppableId === destination.droppableId && source.index === destination.index) return 

        if(type === 'PLO') {
            const deleteElement = ({ source, list, typeIndex, typeDetail, type }) => {
                const index = source.index
                return handleChangeDataD([...list.slice(0, index), ...list.slice(index + 1)], type, typeDetail, typeIndex, id)
            }

            const addElement = ({ data, destination, list, typeIndex, typeDetail, type  }) => {
                const index = destination.index
                return handleChangeDataD([...list.slice(0, index), data, ...list.slice(index)], type, typeDetail, typeIndex, id)
            }

            const changeIndex = ({ source, destination, list, setState, type, typeIndex, typeDetail }) => {
                const data = list.data
                
                const removedElement = data.splice(source.index, 1)[0]
                data.splice(destination.index, 0, removedElement);

                setState(prev => {
                    return {
                        ...prev,
                        data: handleChangeDataD(data, type, typeDetail, typeIndex, id)
                    }
                })
            }

            if(source.droppableId === destination.droppableId) {
                changeIndex({
                    source,
                    destination,
                    list: PLOSelector[source.droppableId].data,
                    setState: PLOSelector[source.droppableId].setState,
                    typeIndex: PLOSelector[source.droppableId].typeIndex,
                    type: PLOSelector[source.droppableId].type,
                    typeDetail: PLOSelector[source.droppableId].typeDetail
                })
                return
            }

            const data = PLOSelector[source.droppableId].data.data[source.index]
            const listBefore = PLOSelector[source.droppableId].data.data
            const setDataBefore = PLOSelector[source.droppableId].setState

            const listAfter = PLOSelector[destination.droppableId].data.data
            const setDataAfter = PLOSelector[destination.droppableId].setState

            setDataBefore(prev => {
                return {
                    ...prev,
                    data: deleteElement({ 
                        source, 
                        list: listBefore,
                        typeIndex: PLOSelector[source.droppableId].typeIndex,
                        type: PLOSelector[source.droppableId].type,
                        typeDetail: PLOSelector[source.droppableId].typeDetail
                    })
                }
            })

            setDataAfter(prev => {
                return {
                    ...prev,
                    data: addElement({
                        data,
                        destination,
                        list: listAfter,
                        typeIndex: PLOSelector[destination.droppableId].typeIndex,
                        type: PLOSelector[destination.droppableId].type,
                        typeDetail: PLOSelector[destination.droppableId].typeDetail
                    })
                }
            })
        }
    }

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
                    <p className="section-D-details">
                        Viết theo từng chuẩn đầu ra, bao gồm các chủ đề chuẩn đầu ra và trình độ năng lực (TĐNL – tham khảo thêm tài liệu và thang trình độ năng lực kèm theo) mà chuẩn đầu ra yêu cầu khi sinh viên tốt nghiệp, PLO = Program Learning Outcomes.<br/>
                        <span style={{ fontWeight: 600, fontSize: '14px', color: '#BE0000' }}>Lưu ý: Dữ liệu chỉ được lưu lại khi bấm nút lưu hoặc nút hoàn tất. Khi đã xóa một chuẩn đầu ra thì dữ liệu về mục tiêu đó ở ma trận mục tiêu - chuẩn đầu ra sẽ bị xóa. Vì vậy, hãy cẩn trọng trước khi lưu lại những thao tác đó!</span>
                    </p>
                    <p className="section-D-details" style={{ fontWeight: 700, padding: '10px 0'}}>Hãy bấm vào từng tiêu đề để thao tác.</p>
                    <div className="section-D-main">
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <div className="section-D-block" id="KIEN_THUC">
                                <h1 onClick={() => setIsHiddenA(!isHiddenA)}>1. CHUẨN VỀ KIẾN THỨC</h1>
                                {
                                    !isHiddenA &&
                                    <>
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
                                    </>
                                }
                                
                            </div>
                            <div className="section-D-block" id="KY_NANG">
                                <h1 onClick={() => setIsHiddenB(!isHiddenB)}>2. CHUẨN VỀ KỸ NĂNG</h1>
                                {
                                    !isHiddenB &&
                                    <>
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
                                    </>
                                }
                            </div>
                            <div className="section-D-block" id="THAI_DO">
                                <h1 onClick={() => setIsHiddenC(!isHiddenC)}>3. CHUẨN VỀ THÁI ĐỘ</h1>
                                {
                                    !isHiddenC &&
                                    <>
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
                                    </>
                                }
                            </div>
                        </DragDropContext>
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