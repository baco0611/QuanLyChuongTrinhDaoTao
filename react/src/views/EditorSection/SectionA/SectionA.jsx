import { useContext, useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useQuery } from 'react-query'
import axios from 'axios'
import { UserContext } from "../../../context/ContextProvider"
import './SectionA.scss'
import Loader from '../../../components/Loader/Loader'
import EditHeader from "../EditHeader/EditHeader"
import EditFooter from "../EditFooter/EditFooter"

function SectionA() {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)
    const navigate = useNavigate()

    const [ sectionAValue, setSectionAValue ] = useState({
        id,
        tenTiengViet: '',
        tenTiengAnh: '',
        trinhDoDaoTao: '',
        maNganhDaoTao: '',
        tenNganhDaoTao: '',
        khoaQuanLyChuongTrinh: '',
        doiTuongTuyenSinh: '',
        thoiGianDaoTao: '',
        loaiHinhDaoTao: '',
        soTinChiYeuCauTichLuy: '',
        dieuKienTotNghiep: '',
        vanBangTotNghiep: '',
        khaNangNangCaoTrinhDo: '',
        chuongTrinhThamKhao: '',
    })

    const [ sectionAChuyenNganh, setSectionAChuyenNganh ] = useState({
        id,
        chuyenNganh: []
    })

    useEffect(() => {
        localStorage.setItem(`sectionA-${id}`, JSON.stringify(sectionAValue))
        localStorage.setItem(`sectionA-chuyenNganh-${id}`, JSON.stringify(sectionAChuyenNganh))
    })

    const fecthAPI = (id) => {
        const sectionAValueApi = `${apiURL}/sectionA/${id}`
        // const sectionAValueApi = `${fakeApi}/sectionA/${id}`
        // const sectionAChuyenNganhApi = `${apiURL}/mainList`
        const sectionAChuyenNganhApi = `${fakeApi}/sectionA-ChuyenNganh`
        return async () => {
            await axios.get(sectionAValueApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data[0])
                        setSectionAValue(restData.data[0])
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
            await axios.get(sectionAChuyenNganhApi) 
                .then(response => {
                    const restData = response.data
                    if(restData.data[0])
                        setSectionAChuyenNganh(restData.data)
                })
                .catch(error => {
                    console.log(error)
                    navigate('/error')
                })
        }
    }

    const { isLoading, isError} = useQuery(`sectionA-${id}`, fecthAPI(id),{
        cacheTime: Infinity,
        refetchOnWindowFocus: false,
    })

    if(isLoading)
        return <Loader/>

    if(isError)
        navigate('/error')

    function isInteger(str) {
        return Number.isInteger(+str);
    }

    const handleChangeValue = e => {
        setSectionAValue({
            ...sectionAValue,
            [e.target.name]: e.target.value
        })
    }

    const handleChangeNumberValue = e => {
        if(isInteger(e.target.value))
            setSectionAValue({
                ...sectionAValue,
                [e.target.name]: e.target.value
            })
    }

    const handleChangeTextArea = e => {
        const value = e.target.value.split(' ')

        if(value.length > 40)
            setSectionAValue({
                ...sectionAValue,
                [e.target.name]: value.slice(0, 40).join(' ')
            })
        else
            setSectionAValue({
                ...sectionAValue,
                [e.target.name]: value.join(' ')
            })
    }

    const handleChangeChuyenNganh = e => {
        setSectionAChuyenNganh({
            ...sectionAChuyenNganh,
            chuyenNganh: e.target.value.split('\n')
        })
    }

    return (
        <>
            <EditHeader 
                currentSection={0} 
                currentId={id}
            />
            <div id="section-A" className="section">
                <div className="section-header wrapper">
                    <h1>A. THÔNG TIN TỔNG QUÁT</h1>
                </div>
                <div className="section-A-main wrapper">
                    <div className="section-A-block">
                        <div>
                            <h4>1. Tên chương trình đào tạo (tiếng Việt)</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="tenTiengViet"
                                value={sectionAValue.tenTiengViet}
                                onChange={handleChangeValue}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>2. Tên chương trình đào tạo (tiếng Anh)</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="tenTiengAnh"
                                value={sectionAValue.tenTiengAnh}
                                onChange={handleChangeValue}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>3. Trình độ đào tạo</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="trinhDoDaoTao"
                                value={sectionAValue.trinhDoDaoTao}
                                onChange={handleChangeValue}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>4. Mã ngành đào tạo </h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="maNganhDaoTao"
                                value={sectionAValue.maNganhDaoTao}
                                onChange={handleChangeValue}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>5. Tên ngành đào tạo</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="tenNganhDaoTao"
                                value={sectionAValue.tenNganhDaoTao}
                                onChange={handleChangeValue}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>6. Khoa quản lý chương trình</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="khoaQuanLyChuongTrinh"
                                value={sectionAValue.khoaQuanLyChuongTrinh}
                                onChange={handleChangeValue}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>7. Đối tượng tuyển sinh</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="doiTuongTuyenSinh"
                                value={sectionAValue.doiTuongTuyenSinh}
                                onChange={handleChangeValue}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>8. Thời gian đào tạo</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="thoiGianDaoTao"
                                value={sectionAValue.thoiGianDaoTao}
                                onChange={handleChangeNumberValue}
                                style={{
                                    width: '120px',
                                    marginRight: '15px',
                                    textAlign: 'center'
                                }}
                            />
                            <span>Học kì</span>
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>9. Loại hình đào tạo</h4>
                        </div>
                        <div>
                            <select 
                                name="loaiHinhDaoTao"
                                onChange={handleChangeValue}
                                value={sectionAValue.loaiHinhDaoTao}
                            >
                                <option value={''}>Select</option>
                                <option value={'Chính quy'}>Chính quy</option>
                                <option value={'Vừa học vừa làm'}>Vừa học vừa làm</option>
                            </select>
                            <i className="ti-angle-right i-loaihinhdaotao"></i>
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>10. Số tín chỉ yêu cầu tích lũy</h4>
                        </div>
                        <div>
                            <input
                                type="text"
                                name="soTinChiYeuCauTichLuy"
                                value={sectionAValue.soTinChiYeuCauTichLuy}
                                onChange={handleChangeNumberValue}
                                style={{
                                    width: '120px',
                                    marginRight: '15px',
                                    textAlign: 'center'
                                }}
                            />
                            <span>Tín chỉ</span>
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>11. Thang điểm</h4>
                        </div>
                        <div>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Điểm hệ 10</th>
                                        <th>Điểm chữ</th>
                                        <th>Điểm hệ 4</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>8.5 - 10</td>
                                        <td>A</td>
                                        <td>4.0</td>
                                    </tr>
                                    <tr>
                                        <td>7.0 - 8.4</td>
                                        <td>B</td>
                                        <td>3.0</td>
                                    </tr>
                                    <tr>
                                        <td>5.5 - 6.9</td>
                                        <td>C</td>
                                        <td>2.0</td>
                                    </tr>
                                    <tr>
                                        <td>4.0 - 5.4</td>
                                        <td>D</td>
                                        <td>4.0</td>
                                    </tr>
                                    <tr>
                                        <td>Dưới 4.0</td>
                                        <td>D</td>
                                        <td>0.0</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>12. Điều kiện tốt nghiệp</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                type="text"
                                name="dieuKienTotNghiep"
                                value={sectionAValue.dieuKienTotNghiep.replaceAll('\\n', '\n')}
                                onChange={handleChangeValue}
                                rows={20}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>13. Văn bằng tốt nghiệp</h4>
                        </div>
                        <div>
                            <select 
                                name="vanBangTotNghiep"
                                onChange={handleChangeValue}
                                value={sectionAValue.vanBangTotNghiep}
                            >
                                <option value={''}>Select</option>
                                <option value={'Cử nhân'}>Cử nhân</option>
                                <option value={'Kỹ sư'}>Kỹ sư</option>
                                <option value={'Kiến trúc sư'}>Kiến trúc sư</option>
                            </select>
                            <i className="ti-angle-right i-loaihinhdaotao"></i>
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>14. Vị trí làm việc sau khi tốt nghiệp</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                                <li>Viết tối đa 40 từ</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                type="text"
                                name="khoaQuanLyChuongTrinh"
                                value={sectionAValue.khoaQuanLyChuongTrinh}
                                onChange={handleChangeTextArea}
                                rows={20}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>15. Khả năng nâng cao trình độ</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                                <li>Viết tối đa 40 từ</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                type="text"
                                name="khaNangNangCaoTrinhDo"
                                value={sectionAValue.khaNangNangCaoTrinhDo.replace('\\n', '\n-')}
                                onChange={handleChangeTextArea}
                                rows={20}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>16. Chương trình chuẩn tham khảo</h4>
                            <ul>
                                <li>Mỗi ý được viết trên một dòng duy nhất</li>
                                <li>Liệt kê ít nhất 3 chương trình chuẩn đã tham chiếu khi xây dựng chuẩn đầu ra</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                type="text"
                                name="chuongTrinhThamKhao"
                                value={sectionAValue.chuongTrinhThamKhao}
                                onChange={handleChangeValue}
                                rows={20}
                            />
                        </div>
                    </div>
                    <div className="section-A-block">
                        <div>
                            <h4>17. Các chuyên ngành đào tạo</h4>
                            <ul>
                                <li>Mỗi chuyên ngành đào tạo được viết trên một dòng duy nhất</li>
                                <li>Nếu không có chuyên ngành đào tạo thì để trống</li>
                            </ul>
                        </div>
                        <div>
                            <textarea
                                type="text"
                                name="chuyenNganh"
                                value={sectionAChuyenNganh.chuyenNganh.join('\n')}
                                onChange={handleChangeChuyenNganh}
                                rows={20}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <EditFooter 
                currentSection={0} 
                currentId={id}
            />
        </>
    )
}

export default SectionA