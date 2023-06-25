const handleUpdateSectionC = (id) => {
    const sectionCElement = JSON.parse(localStorage.getItem(`sectionC-${id}`))
    const sectionCDelete = JSON.parse(localStorage.getItem(`sectionC-delete-${id}`))

    const deleteElement = sectionCDelete.filter(item => item.id != '').map(item => {return {id: item.id, idCTDT: item.idCTDT}})
    const createElement = sectionCElement.filter(item => item.id == '').map(item => {return {kiHieu:item.kiHieu, noiDung:item.noiDung, loaiMucTieu: item.loaiMucTieu, idCTDT: item.idCTDT}})
    const updateElement = sectionCElement.filter(item => item.id != '')

    console.log(deleteElement, createElement, updateElement)
}

const handleUpdateDatabase = ({ currentSection, currentId }) => {
    switch(currentSection) {
        case 'C':
            handleUpdateSectionC(currentId)
    }
}

// For SECTION C

const sortCondition = (a, b) => a.kiHieu < b.kiHieu ? -1 : 1

const handleSplitSection = ({ data, setSectionCKienThuc, setSectionCKyNang, setSectionCThaiDo }) => {
    const KIEN_THUC = data.filter(item => item.loaiMucTieu === 'KIEN_THUC')
    KIEN_THUC.sort(sortCondition)
    setSectionCKienThuc(KIEN_THUC)

    const KY_NANG = data.filter(item => item.loaiMucTieu === 'KY_NANG')
    KY_NANG.sort(sortCondition)
    setSectionCKyNang(KY_NANG)

    const THAI_DO = data.filter(item => item.loaiMucTieu === 'THAI_DO')
    THAI_DO.sort(sortCondition)
    setSectionCThaiDo(THAI_DO)
}

// Handle changing value in an input element
const handleChangeValue = ({ type, setState }) => {
    const element = document.querySelectorAll(`#${type} input`)

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
const handleChangeData = (element, type, typeIndex, idCTDT) => {
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

function getParent(element, className) {
    while(element.parentElement) {
        if(element.parentElement.className == className)
            return element.parentElement
        
        element = element.parentElement
    }
}
const handleClickDelete = ({ e, setState, data, setDelete, idctdt }) => {
    const parentElement = getParent(e.target, 'element')
    const inputElement = parentElement.querySelector('input')
    const dataset = inputElement.dataset
    
    const list = [...data]
    const deleteElement = list[dataset.index - 1]
    list.splice(dataset.index - 1, 1)
    setState(handleChangeData(list, dataset.type, dataset.typeindex, idctdt))
    setDelete(prev => [...prev, deleteElement])
}

const handleClickAdd = ({ setState, idCTDT, type, typeIndex }) => {
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
        return handleChangeData(list, type, typeIndex, idCTDT)
    })
}

export { handleChangeValue, handleUpdateDatabase, handleSplitSection, handleClickDelete, handleChangeData, handleClickAdd }