import { values } from "lodash"
import { deleteData, postData } from "./HandleUpdateDatabase"

const handleUpdateSectionA = (id, api) => {
    const sectionAValue = JSON.parse(localStorage.getItem(`sectionA-${id}`))
    const sectionAChuyenNganh = JSON.parse(localStorage.getItem(`sectionA-ChuyenNganh-${id}`))
    const deleteValue = JSON.parse(localStorage.getItem(`sectionA-delete-${id}`))

    const updateValue = sectionAChuyenNganh.filter(item => item.idChuyenNganh != '')
    const createValue = sectionAChuyenNganh.filter(item => item.idChuyenNganh == '').map(item => item.tenChuyenNganh)

    postData(api, '/update_sectionA', sectionAValue, 'UPDATE_SECTIONA', 'SOMETHING HAS BEEN INTERESTED WITH THE UPDATE')
    deleteData(api, '/delete_ChuyenNganhDaoTao', { idCTDT: id, deleteData: deleteValue }, 'DELETE_CHUYEN_NGANH')
    postData(api, '/update_ChuyenNganhDaoTao', { idCTDT: id, data: updateValue }, 'UPDATE_CHUYEN_NGANH' )
    postData(api, '/create_ChuyenNganhDaoTao', { idCTDT: id, data: createValue }, 'UPDATE_CHUYEN_NGANH')
}

const handleChangeValueA = (e, setState, indexItem) => {
    setState(prev => {
        const value = prev.map((item, index) => {
            if(index !== indexItem)
                return item
            else {
                item.tenChuyenNganh = e.target.value
                return item
            }
        })

        return value
    })
}

const handleDeleteChuyenNganh = (setState, setDelete, indexItem, id) => {
    setState(prev => {
        const value = prev.filter((item, index) => {
            if(index != indexItem)
                return item
        })
        
        console.log(value)
        return value
    })


    if(id != '')
        setDelete(prev => [...prev, id])
}

const handleAddChuyenNganh = ( setState ) => {
    setState(prev => [
        ...prev,
        {
            idChuyenNganh: '',
            tenChuyenNganh: ''
        }
    ])
}

export { 
    handleUpdateSectionA, 
    handleDeleteChuyenNganh,
    handleChangeValueA,
    handleAddChuyenNganh
}