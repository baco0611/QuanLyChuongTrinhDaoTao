import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { UserContext } from "../../../context/ContextProvider"
import axios from "axios"

function CreateElement({ khoiKienThuc, chiTietKhoiKienThuc, idChuyenNganh, setCreate }) {

    const { id } = useParams()
    const { apiURL, fakeApi } = useContext(UserContext)

    const [ createValue, setCreateValue ] = useState({
        idDeCuongHocPhan: '',
        thayTheKhoaLuan: false,
        batBuoc: false,
        tienQuyet: [],
        hocTruoc: [],
        songHanh: [],
        hocKy: '',
        khoiKienThuc: khoiKienThuc,
        chiTietKhoiKienThuc: chiTietKhoiKienThuc,
        idChuyenNganh: idChuyenNganh,
        maHocPhan: '',
        tenHocPhan: ''
    })

    const [ soHocKy, setSoHocKy ] = useState(8)

    useEffect(() => {
        const sectionAValueApi = `${apiURL}/sectionA/${id}`
        axios.get(sectionAValueApi) 
            .then(response => {
                const restData = response.data
                if(restData.data[0])
                    setSoHocKy(restData.data[0].thoiGianDaoTao)
            })
            .catch(error => {
                console.log(error)
                // navigate('/error')
            })
    }, [])

    const handleChangeHocKy = (e) => {
        const elementValue = e.target

        let value = Number.parseInt(elementValue.value)
        if(value >= 1 && value<=soHocKy)
            value = value
        else 
            value = ''
        setCreateValue({
            ...createValue,
            [elementValue.name]: value
        })
    }

    const handleChangeTextBox = (e) => {
        let value = !createValue[e.target.name]

        if(chiTietKhoiKienThuc != 'DO_AN_KHOA_LUAN') {
            if(e.target.name == 'thayTheKhoaLuan')
                value = false
        }

        setCreateValue({
            ...createValue,
            [e.target.name]: value
        })
    }

    const handleClose = () => {
        setCreateValue({
            idDeCuongHocPhan: '',
            thayTheKhoaLuan: false,
            batBuoc: true,
            tienQuyet: [],
            hocTruoc: [],
            songHanh: [],
            hocKy: '',
            khoiKienThuc: khoiKienThuc,
            chiTietKhoiKienThuc: chiTietKhoiKienThuc,
            idChuyenNganh: idChuyenNganh,
            maHocPhan: '',
            tenHocPhan: ''
        })
        setCreate(false)
    }

    return (
        <div className="section-G-create">
            <div className="section-G-createMain">
                <h1>Thêm học phần</h1>
                <form>
                    <div className="flexGroup">
                        <div className="formGroup">
                            <label htmlFor="maHocPhan">Mã học phần</label>
                            <input
                                id="maHocPhan"
                                type="text"
                                name="maHocPhan" 
                                value={createValue.maHocPhan}   
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="hocKy">Học kỳ</label>
                            <input
                                id="hocKy"
                                type="text"
                                name="hocKy"
                                value={createValue.hocKy}    
                                onChange={e => handleChangeHocKy(e)}
                            />
                        </div>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="tenHocPhan">Tên học phần</label>
                        <input 
                            id="tenHocPhan"    
                            type="text"
                            name="tenHocPhan"  
                            value={createValue.tenHocPhan}  
                        />
                    </div>
                    <div className="flexGroup box">
                        <div className="formGroup">
                            <label htmlFor="batBuoc">Bắt buộc</label>
                            <input 
                                id="batBuoc"
                                type="checkBox"
                                name="batBuoc"
                                checked={createValue.batBuoc}
                                onChange={e => handleChangeTextBox(e)}
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="thayTheKhoaLuan">Thay thế khóa luận</label>
                            <input 
                                id="thayTheKhoaLuan"
                                type="checkBox"
                                name="thayTheKhoaLuan"
                                checked={createValue.thayTheKhoaLuan}
                                onChange={e => handleChangeTextBox(e)}
                            />
                        </div>
                    </div>
                    <div className="formGroup">
                        <label htmlFor="tienQuyen">Tiên quyết</label>
                        <input 
                            id="tienQuyen"
                            type="text"
                            name="tienQuyen"
                            value={createValue.tienQuyet.join(', ')}
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="hocTruoc">Học trước</label>
                        <input 
                            id="hocTruoc"
                            type="text"
                            name="hocTruoc"
                            value={createValue.hocTruoc.join(', ')}
                        />
                    </div>
                    <div className="formGroup">
                        <label htmlFor="songHanh">Song hành</label>
                        <input 
                            id="songHanh"
                            type="text"
                            name="songHanh"
                            value={createValue.songHanh.join(', ')}
                        />
                    </div>
                </form>
                <div className="navigate">
                    <button
                        onClick={handleClose}
                    >Hủy bỏ</button>
                    <button>Lưu học phần</button>
                </div>
            </div>
        </div>
    )
}

export default CreateElement