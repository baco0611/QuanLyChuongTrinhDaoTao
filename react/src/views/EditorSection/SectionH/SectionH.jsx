import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionH.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import axios from "axios"
import { useQuery } from "react-query"
import Loader from "../../../components/Loader/Loader"
import { handleSplitSectionG } from "../Database/HandleActionSectionG"
import { handleSplitSectionD } from "../Database/HandleActionSectionD"
import { handleSplitPLO } from "../Database/HandleActionSectionH"
import RowBlock from "./RowBlock"

function SectionH() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()

    const [ sectionGValue, setSectionGValue ] = useState({
        DAI_CUONG: {
            data: [],
            type: 'DAI_CUONG'
        },
        CHUYEN_NGHIEP: {
            type: 'CHUYEN_NGHIEP',
            CO_SO_NGANH: {
                data: [],
                type: 'CO_SO_NGANH',    
            },
            NGANH: {
                data: [],
                type: 'NGANH',    
            },
            BO_TRO: {
                data: [],
                type: 'BO_TRO',    
            },
            THUC_TAP: {
                data: [],
                type: 'THUC_TAP',    
            },
            DO_AN_KHOA_LUAN: {
                data: [],
                type: 'DO_AN_KHOA_LUAN',
            },
            THAY_THE_KHOA_LUAN: {
                data: [],
                type: 'THAY_THE_KHOA_LUAN'
            },
            CHUYEN_NGANH: {
                type: 'CHUYEN_NGANH'   
            }
        }
    })

    const [ PLOValue, setPLOValue ] = useState({
        KIEN_THUC: {
            type: 'KIEN_THUC',
            data: []
        },
        KY_NANG: {
            type: 'KY_NANG',
            data: []
        },
        THAI_DO: {
            type: 'THAI_DO',
            data: []
        }
    })

    console.log(sectionGValue)
    console.log(PLOValue)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const fecthAPI = (id) => {
        
        const sectionGValueApi = `${apiURL}/sectionG/${id}`
        const PLOValueApi = `${apiURL}/sectionD/${id}`
        
        return async () => {
            await axios.get(sectionGValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data)
                        handleSplitSectionG(restData.data, setSectionGValue, apiURL, id)
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })

            await axios.get(PLOValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data)
                        handleSplitPLO({ 
                            data: restData.data,
                            setState: setPLOValue
                        })
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
        }
    }

    const { isLoading, isError} = useQuery(`sectionH-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    const splitItem = (data) => {
        return data.split(' - ')
    }

    return(
        <>
            <EditHeader
                currentSection={6}
            />
            <div id="section-D" className="section">
                <div className="section-header wrapper">
                    <h1>H. MA TRẬN HỌC PHẦN ĐỐI VỚI CHUẨN ĐẦU RA</h1>
                </div>
                <div className="section-H wrapper">
                    <p className="section-H-details">
                        Hãy điền mức độ đáp ứng vào ô ứng với chuẩn đầu ra (PLO) mà học phầ đó đáp ứng.<br/>
                        <span style={{color: '#BE0000'}}><b>Lưu ý: Dữ liệu chỉ được lưu khi bấm lưu hoặc hoàn tất.</b></span>
                    </p>
                    <div className="section-H-main">
                        <table>
                            <thead>
                                <tr>
                                    <th rowSpan={3}>STT</th>
                                    <th rowSpan={3}>Mã hp</th>
                                    <th rowSpan={3}>Tên học phần</th>
                                    <th rowSpan={3}>STC</th>
                                    <th colSpan={PLOValue.KIEN_THUC.data.length || 1}>Chuẩn về kiến thức</th>
                                    <th colSpan={PLOValue.KY_NANG.data.length || 1}>Chuẩn về kỹ năng</th>
                                    <th colSpan={PLOValue.THAI_DO.data.length || 1}>Chuẩn về thái độ</th>
                                </tr>
                                <tr>
                                    {
                                        PLOValue.KIEN_THUC.data.map((item, index) => {
                                            return <th key={index}>{
                                                <>
                                                    {splitItem(item.kiHieu)[0]} 
                                                    <br/>
                                                    {splitItem(item.kiHieu)[1]} 
                                                </>
                                            }</th>
                                        })
                                    }
                                    {
                                        PLOValue.KY_NANG.data.map((item, index) => {
                                            return <th key={index}>{
                                                <>
                                                    {splitItem(item.kiHieu)[0]} 
                                                    <br/>
                                                    {splitItem(item.kiHieu)[1]} 
                                                </>
                                            }</th>
                                        })
                                    }
                                    {
                                        PLOValue.THAI_DO.data.map((item, index) => {
                                            return <th key={index}>{
                                                <>
                                                    {splitItem(item.kiHieu)[0]} 
                                                    <br/>
                                                    {splitItem(item.kiHieu)[1]} 
                                                </>
                                            }</th>
                                        })
                                    }
                                </tr>
                            </thead>
                            <tbody>
                                <RowBlock
                                    title={''}
                                    index={'I.'}
                                />
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <EditFooter
                currentSection={6}
            />
        </>
    )
}

export default SectionH