import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionC.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import Loader from "../../../components/Loader/Loader"
import { useQuery } from "react-query"
import axios from "axios"
import POBlock from "./POBlock"
import { DragDropContext } from 'react-beautiful-dnd' 
import { handleChangeDataC, handleSplitSectionC } from "../Database/HandleActionSectionC"

function SectionC() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()
    const [ sectionCKienThuc, setSectionCKienThuc ] = useState([])
    const [ sectionCKyNang, setSectionCKyNang ] = useState([])
    const [ sectionCThaiDo, setSectionCThaiDo ] = useState([])
    const [ deleteElement, setDeleteElement ] = useState([])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const fecthAPI = (id) => {
        const sectionCValueApi = `${apiURL}/sectionC/${id}`
        // const sectionCValueApi = `${fakeApi}/sectionC/${id}`
        return async () => {
            await axios.get(sectionCValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data)
                        handleSplitSectionC({ 
                            data: restData.data,
                            setSectionCKienThuc,
                            setSectionCKyNang,
                            setSectionCThaiDo
                        })
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
        }
    }

    useEffect(() => {
        localStorage.setItem(`sectionC-${id}`, JSON.stringify([...sectionCKienThuc, ...sectionCKyNang, ...sectionCThaiDo]))
        localStorage.setItem(`sectionC-delete-${id}`, JSON.stringify(deleteElement))
    })

    const { isLoading, isError} = useQuery(`sectionC-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    const handleDragEnd = (results) => {
        // console.log(results)
        const { source, destination, type } = results
    
        if(!destination) return
    
        if(source.droppableId === destination.droppableId && source.index === destination.index) return 
        
        if(type === 'PO') {

            // Function to split and splice state
            const deleteElement = ({ source, list }) => {
                const type = source.droppableId
                const index = source.index
                switch(type) {
                    case 'KIEN_THUC':
                        return handleChangeDataC([...list.slice(0, index), ...list.slice(index + 1)], type, 1, id)
                    case 'KY_NANG':
                        return handleChangeDataC([...list.slice(0, index), ...list.slice(index + 1)], type, 2, id)
                    case 'THAI_DO':
                        return handleChangeDataC([...list.slice(0, index), ...list.slice(index + 1)], type, 3, id)
                }

                return list
            }

            const addElement = ({ data, destination, list }) => {
                const type = destination.droppableId
                const index = destination.index
                switch(type) {
                    case 'KIEN_THUC':
                        return handleChangeDataC([...list.slice(0, index), data, ...list.slice(index)], type, 1, id)
                    case 'KY_NANG':
                        return handleChangeDataC([...list.slice(0, index), data, ...list.slice(index)], type, 2, id)
                    case 'THAI_DO':
                        return handleChangeDataC([...list.slice(0, index), data, ...list.slice(index)], type, 3, id)
                }
            }

            const changeIndex = ({ source, destination, list, setState }) => {
                const removedElement = list.splice(source.index, 1)[0];
                list.splice(destination.index, 0, removedElement);

                let typeIndex

                switch(source.droppableId) {
                    case 'KIEN_THUC':
                        typeIndex = 1
                        break
                    case 'KY_NANG':
                        typeIndex = 2
                        break
                    case 'THAI_DO':
                        typeIndex = 3
                        break
                }

                setState(handleChangeDataC(list, source.droppableId, typeIndex, id))
            }

            // If The drag is in 1 PO block
            if(source.droppableId === destination.droppableId) {
                switch(source.droppableId) {
                    case 'KIEN_THUC':
                        changeIndex({
                            source,
                            destination,
                            list: sectionCKienThuc,
                            setState: setSectionCKienThuc
                        })
                        break
                    case 'KY_NANG':
                        changeIndex({
                            source,
                            destination,
                            list: sectionCKyNang,
                            setState: setSectionCKyNang
                        })
                        break
                    case 'THAI_DO':
                        changeIndex({
                            source,
                            destination,
                            list: sectionCThaiDo,
                            setState: setSectionCThaiDo
                        })
                        break
                }
                return
            }

            // Get data of drag element
            let data, listBefore, setStateBefore
            switch(source.droppableId) {
                case 'KIEN_THUC':
                    data = sectionCKienThuc[source.index]
                    setStateBefore = setSectionCKienThuc
                    listBefore = sectionCKienThuc
                    break
                case 'KY_NANG':
                    data = sectionCKyNang[source.index]
                    setStateBefore = setSectionCKyNang
                    listBefore = sectionCKyNang
                    break
                case 'THAI_DO':
                    data = sectionCThaiDo[source.index]
                    setStateBefore = setSectionCThaiDo
                    listBefore = sectionCThaiDo
                    break
            }

            let listAfter, setStateAfter
            switch(destination.droppableId) {
                case 'KIEN_THUC':
                    listAfter = sectionCKienThuc
                    setStateAfter = setSectionCKienThuc
                    break
                case 'KY_NANG':
                    listAfter = sectionCKyNang
                    setStateAfter = setSectionCKyNang
                    break
                case 'THAI_DO':
                    listAfter = sectionCThaiDo
                    setStateAfter = setSectionCThaiDo
                    break
            }

            // Handle change index and component
            if(listAfter.length <= 4) {
                setStateBefore(deleteElement({ source, list: listBefore }))
                setStateAfter(addElement({ data, destination, list: listAfter }))
            }
        }
    }
    
    return(
        <>
            <EditHeader 
                currentSection={2} 
                currentiId={id}
            />
            <div id="section-C" className="section">
                <div className="section-header wrapper">
                    <h1>C. MỤC TIÊU CỤ THỂ</h1>
                </div>
                <div className="section-C wrapper">
                    <p className="section-C-details">Tối đa 05 mục tiêu cụ thể cho mỗi phần về kiến thức, kỹ năng và thái độ của sinh viên sau khi tốt nghiệp, PO = Program Objectives.<br/>Sinh viên sau khi tốt nghiệp có các kiến thức, kỹ năng và thái độ được thể hiện như bên dưới.<br/><span style={{fontWeight: 600, fontSize: '14px'}}>Lưu ý: Dữ liệu chỉ được lưu lại khi bấm nút lưu hoặc nút hoàn tất. Khi đã xóa một mục tiêu cụ thể thì dữ liệu về mục tiêu đó ở ma trận mục tiêu - chuẩn đầu ra sẽ bị xóa. Vì vậy, hãy cẩn trọng trước khi lưu lại những thao tác đó!</span></p>
                    <div className="section-C-main">
                        <DragDropContext onDragEnd={handleDragEnd}>
                            <POBlock
                                title = {'1. KIẾN THỨC'}
                                data = {sectionCKienThuc}
                                type = {'KIEN_THUC'}
                                setState = {setSectionCKienThuc}
                                setDelete = {setDeleteElement}
                                idCTDT = {id}
                            />
                            <POBlock
                                title = {'2. KỸ NĂNG'}
                                data = {sectionCKyNang}
                                type = {'KY_NANG'}
                                setState = {setSectionCKyNang}
                                setDelete = {setDeleteElement}
                                idCTDT = {id}
                            />
                            <POBlock
                                title = {'3.THÁI ĐỘ'}
                                data = {sectionCThaiDo}
                                type = {'THAI_DO'}
                                setState = {setSectionCThaiDo}
                                setDelete = {setDeleteElement}
                                idCTDT = {id}
                            />
                        </DragDropContext>
                    </div>
                </div>
            </div>
            <EditFooter 
                currentSection={2} 
                currentId={id}
            />
        </>
    )
}

export default SectionC