import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery } from 'react-query'
import { useContext } from 'react'
import { UserContext } from '../../context/ContextProvider'
import Loader from '../../components/Loader/Loader'
import './ListSection.scss'

function ListSection () {

    const { apiURL, fakeApi } = useContext(UserContext); 
    const navigate = useNavigate()

    const fecthAPI = () => {
        // const mainListApi = `${apiURL}/mainList`
        const mainListApi = `${fakeApi}/mainList`
        return async () => {
            const result = await axios.get(mainListApi) 
                .then(response => {
                    const restData = response.data
                    return restData.data
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
            return result
        }
    }

    const { data , isLoading, isError} = useQuery(`introduce`, fecthAPI(),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    console.log(data)

    return (
        <div id='list-section'>
            <header>
                <h1>DANH SÁCH CHƯƠNG TRÌNH ĐÀO TẠO</h1>
            </header> 
            <table className='list-table wrapper'>
                <thead>
                    <th style={{width: '45px'}}>STT</th>
                    <th style={{width: '250px'}}>Mã chương trình đào tạo</th>
                    <th style={{width: '250px'}}>Mã ngành đào tạo</th>
                    <th style={{width: '300px'}}>Tên ngành đào tạo</th>
                    <th style={{width: '200px'}}>Trạng thái</th>
                    <th style={{width: '180px'}}>Tác giả</th>
                    <th style={{width: '180px'}}>Lần cuối</th>
                    <th style={{width: '180px'}}>Ngày tạo</th>
                </thead>
                <tbody>
                    {
                        data.map((data, index) => {
                            return (
                                <tr key={index}>
                                    <td style={{width: '45px'}}>
                                        <Link to={`/edit/sectionA/${data.id}`}>
                                            {data.stt}
                                        </Link>
                                    </td>
                                    <td style={{width: '250px'}}>
                                        <Link to={`/edit/sectionA/${data.id}`}>
                                            {data.maChuongTrinhDaoTao}
                                        </Link>
                                    </td>
                                    <td style={{width: '250px'}}>
                                        <Link to={`/edit/sectionA/${data.id}`}>
                                            {data.maNganhDaoTao}
                                        </Link>
                                    </td>
                                    <td className='text-left' style={{width: '300px'}}>
                                        <Link to={`/edit/sectionA/${data.id}`}>
                                            {data.tenNganhDaoTao}
                                        </Link>
                                    </td>
                                    <td style={{width: '200px'}}>
                                        <Link to={`/edit/sectionA/${data.id}`}>
                                            {data.trangThai}
                                        </Link>
                                    </td>
                                    <td style={{width: '180px'}}>
                                        <Link to={`/edit/sectionA/${data.id}`}>
                                            {data.nguoiTao}
                                        </Link>
                                    </td>
                                    <td style={{width: '180px'}}>
                                        <Link to={`/edit/sectionA/${data.id}`}>
                                            {data.updated_at}
                                        </Link>
                                    </td>
                                    <td style={{width: '180px'}}>
                                        <Link to={`/edit/sectionA/${data.id}`}>
                                            {data.created_at}
                                        </Link>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default ListSection