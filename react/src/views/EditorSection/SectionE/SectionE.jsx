import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import './SectionE.scss'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"
import axios from "axios"
import { useQuery } from "react-query"
import Loader from "../../../components/Loader/Loader"

function SectionE() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()
    const [ sectionEValue, setSectionEValue ] = useState()

    const fecthAPI = (id) => {
        const sectionEValueApi = `${apiURL}/sectionE/${id}`

        return async () => {
            await axios.get(sectionEValueApi) 
                .then(response => {
                    const restData = response.data
                    console.log(restData)
                    setSectionEValue(restData.checkData)
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
                currentSection={4}
            />
            <div id="section-E" className="section">
                <div className="section-header wrapper">
                    <h1>E. MA TRẬN ĐẦU RA ĐỐI VỚI MỤC TIÊU</h1>
                </div>
                <div className="section-E wrapper">
                    <p className="section-E-details">
                        Hãy bấm vào ô tương ứng với Mục tiêu (PO) theo cột và Chuẩn đầu ra (PLO) theo dòng.<br/>
                        Chỉ tick <span style={{color: '#BE0000'}}><b>X</b></span> vào những ô được chọn.<br/>
                        <span style={{color: '#BE0000'}}>Lưu ý: Dữ liệu chỉ được lưu khi bấm lưu hoặc hoàn tất.
                            Khi bấm hoàn tất, mỗi dòng, mỗi cột phải có ít nhất một ô được chọn (Mỗi mục tiêu phải ứng với ít nhất một chuẩn đầu ra và ngược lại).
                        </span>
                    </p>
                    <div className="section-E-main">
                        <table>
                            <thead>
                                <tr>
                                    <th>Ký kiệu</th>
                                    <th>Chuẩn đầu ra</th>
                                    <th>Mục tiêu</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <EditFooter
                currentSection={4}
            />
        </>
    )
}

export default SectionE