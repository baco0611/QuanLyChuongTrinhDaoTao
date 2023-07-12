import { useState } from "react"
import { getParent } from "../Database/HandleUpdateDatabase"
import EditElement from "./EditElement"

function SectionGElement({ index, data, setState }) {

    const [ isEdit, setIsEdit ] = useState(false)

    const handleOpen = (e) => {
        const parent = getParent(e.target, 'section-G-create')
        if(!parent) {
            setIsEdit(true)
        }
    }

    return (
        <tr
            onDoubleClick={e => handleOpen(e)}
            className="cursorPointer"
        >
            <td>{index}</td>
            <td>{data.maHocPhan}</td>
            <td 
                style={{
                    textAlign:'left',
                    paddingLeft: '10px'
                }}
            >{data.tenHocPhan}</td>
            <td>
                <input 
                    type="checkbox" 
                    checked={data.batBuoc}
                    readOnly   
                />
            </td>
            <td>{data.soTinChi}</td>
            <td>{data.lyThuyet}</td>
            <td>{data.baiTap}</td>
            <td>{data.thaoLuan}</td>
            <td>{data.thucHanh}</td>
            <td>{data.thucTap}</td>
            <td>{data.tienQuyet.join(', ')}</td>
            <td>{data.hocTruoc.join(', ')}</td>
            <td>{data.songHanh.join(', ')}</td>
            <td>{data.hocKy}</td>
            {
                isEdit &&
                <EditElement
                    data={data}
                    khoiKienThuc={data.khoiKienThuc}
                    chiTietKhoiKienThuc={data.chiTietKhoiKienThuc}
                    idChuyenNganh={data.idChuyenNganh}
                    setEdit={setIsEdit}
                />
            }
        </tr>
    )
}

export default SectionGElement