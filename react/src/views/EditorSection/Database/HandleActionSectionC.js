// For SECTION C

import { deleteData, getParent, postData } from "./HandleUpdateDatabase"

const sortCondition = (a, b) => a.kiHieu < b.kiHieu ? -1 : 1

const handleSplitSectionC = ({ data, setSectionCKienThuc, setSectionCKyNang, setSectionCThaiDo }) => {
    const idctdt = data[0].idCTDT

    const KIEN_THUC = data.filter(item => item.loaiMucTieu === 'KIEN_THUC')
    KIEN_THUC.sort(sortCondition)
    setSectionCKienThuc(handleChangeDataC(KIEN_THUC, 'KIEN_THUC', 1, idctdt))

    const KY_NANG = data.filter(item => item.loaiMucTieu === 'KY_NANG')
    KY_NANG.sort(sortCondition)
    setSectionCKyNang(handleChangeDataC(KY_NANG, 'KY_NANG', 2, idctdt))

    const THAI_DO = data.filter(item => item.loaiMucTieu === 'THAI_DO')
    THAI_DO.sort(sortCondition)
    setSectionCThaiDo(handleChangeDataC(THAI_DO, 'THAI_DO', 3, idctdt))
}

// Handle changing value in an input element
const handleChangeValueC = ({ type, setState }) => {
    const element = document.querySelectorAll(`#${type} input, #${type} textarea`)

    const value = Array.from(element).map((item, index) => {
        return {
            // kiHieu: `PO - ${item.getAttribute('data-typeindex')}.${item.getAttribute('data-index')}`,
            kiHieu: `PO - ${item.getAttribute('data-typeindex')}.${index+1}`,
            noiDung: item.value,
            loaiMucTieu: type,
            id: item.getAttribute('data-id'),
            idCTDT: item.getAttribute('data-idctdt')
        }
    })

    value.sort((a, b) => a.kiHieu < b.kiHieu ? -1 : 1)

    setState(value)
}

// Handle changing many thing (like drop, ...)
const handleChangeDataC = (element, type, typeIndex, idCTDT) => {
    const value = element.map((item, index) => {
        return {
            kiHieu: `PO - ${typeIndex}.${index+1}`,
            noiDung: item.noiDung,
            loaiMucTieu: type,
            id: item.id,
            idCTDT: idCTDT
        }
    })

    value.sort((a, b) => a.kiHieu < b.kiHieu ? -1 : 1)
    return value
}

const handleClickDeleteC = ({ e, setState, data, setDelete, idctdt }) => {
    const parentElement = getParent(e.target, 'element')
    const inputElement = parentElement.querySelector('textarea')
    const dataset = inputElement.dataset
    
    const list = [...data]
    const deleteElement = list[dataset.index - 1]
    list.splice(dataset.index - 1, 1)
    setState(handleChangeDataC(list, dataset.type, dataset.typeindex, idctdt))
    setDelete(prev => [...prev, deleteElement])
}

const handleClickAddC = ({ setState, idCTDT, type, typeIndex }) => {
    setState(prev => {
        const list =
        [
            ...prev,
            {
                kiHieu: '',
                loaiMucTieu: '',
                noiDung: '',
                id: '',
                idCTDT: Number.parseInt(idCTDT)
            }
        ]
        return handleChangeDataC(list, type, typeIndex, idCTDT)
    })
}

const handleUpdateSectionC = (id, api) => {
    const sectionCElement = JSON.parse(localStorage.getItem(`sectionC-${id}`))
    const sectionCDelete = JSON.parse(localStorage.getItem(`sectionC-delete-${id}`))

    const deleteElement = sectionCDelete.filter(item => item.id != '').map(item => {return {id: item.id, idCTDT: item.idCTDT}})
    const createElement = sectionCElement.filter(item => item.id == '').map(item => {return {kiHieu:item.kiHieu, noiDung: item.noiDung, loaiMucTieu: item.loaiMucTieu, idCTDT: item.idCTDT}})
    const updateElement = sectionCElement.filter(item => item.id != '')

    // debugger
    if(deleteElement.length <= 0) console.log('DELETE_SECTIONC')
    else deleteData(api, '/delete_sectionC', { idCTDT: id, deleteData: deleteElement }, 'DELETE_SECTIONC')
    
    // debugger
    if(createElement.length <= 0) console.log('CREATE_SECTIONC')
    else postData(api, '/create_sectionC', { idCTDT: id, data: createElement }, 'CREATE_SECIONC')

    // debugger
    if(updateElement.length <= 0) console.log('UPDATE_SECTIONC')
    else postData(api, '/update_sectionC', { idCTDT: id, data: updateElement }, 'UPDATE_SECTIONC')
}

export { 
    handleChangeDataC, 
    handleClickAddC, 
    handleClickDeleteC, 
    handleChangeValueC, 
    handleSplitSectionC, 
    handleUpdateSectionC 
}