import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionB.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import { useQuery } from "react-query"
import axios from "axios"
import Loader from "../../../components/Loader/Loader"

function SectionB() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()
    const [ sectionBValue, setSectionBValue ] = useState({
        id,
        mucTieuTongQuat: ''
    }) 

    useEffect(() => {
        localStorage.setItem(`sectionB-${id}`, JSON.stringify(sectionBValue))
    })

    const fecthAPI = (id) => {
        const sectionBValueApi = `${apiURL}/sectionB/${id}`
        // const sectionBValueApi = `${fakeApi}/sectionB/${id}`
        return async () => {
            await axios.get(sectionBValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data[0]) 
                        setSectionBValue(restData.data[0])
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
        }
    }

    const { isLoading, isError} = useQuery(`sectionB-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    const handleChangeTextArea = e => {
        const value = e.target.value.split(' ')

        if(value.length > 50)
            setSectionBValue({
                ...sectionBValue,
                [e.target.name]: value.slice(0, 50).join(' ')
            })
        else
            setSectionBValue({
                ...sectionBValue,
                [e.target.name]: value.join(' ')
            })
    }

    console.log(sectionBValue.mucTieuTongQuat.replace('\\n', '\n'))


    return(
        <>
            <EditHeader
                currentSection={1}
                currentId={id}
            />
            <div id="section-B" className="section">
                <div className="section-header wrapper">
                    <h1>B. MỤC TIÊU TỔNG QUÁT</h1>
                </div>
                <div className="section-B-main wrapper">
                    <p>Viết tối đa 50 từ: trình bày tổng quát về chương trình đào tạo, trong đó xác định mục tiêu tổng quát của chương trình đào tạo: năng lực về kiến thức, năng lực thực hành nghề nghiệp của sinh viên sau khi tốt nghiệp…</p>
                    <textarea
                        type="text"
                        name="mucTieuTongQuat"
                        value={sectionBValue.mucTieuTongQuat}
                        onChange={handleChangeTextArea}
                        rows={20}
                    />
                </div>
            </div>
            <EditFooter
                currentSection={1}
                currentId={id}
            />
        </>
    )
}

export default SectionB