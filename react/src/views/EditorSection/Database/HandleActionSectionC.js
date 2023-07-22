// For SECTION C

import { deleteData, getParent, postData } from "./HandleUpdateDatabase"

const sortCondition = (a, b) => {
    const aKiHieu = a.kiHieu.split('.')
    const bKiHieu = b.kiHieu.split('.')

    const aK = Number.parseInt(aKiHieu.pop())
    const bK = Number.parseInt(bKiHieu.pop())

    return aK < bK ? -1 : 1
}

const handleSplitSectionC = ({ data, setSectionCValue, idctdt }) => {

    const typeList = ['KIEN_THUC', 'KY_NANG', 'THAI_DO']

    typeList.forEach(type => {
        const dataList = data.filter(item => item.loaiMucTieu === type)
        dataList.sort(sortCondition)
        setSectionCValue(prev => {
            const dataType = prev[type]
            return {
                ...prev,
                [type]: {
                    ...dataType,
                    data: handleChangeDataC(dataList, type, dataType.typeIndex, idctdt)
                }
            }
        })     
    })
}

// Handle changing value in an input element
const handleChangeValueC = ({ type, setState }) => {
    const element = document.querySelectorAll(`#${type} input, #${type} textarea`)

    const value = Array.from(element).map((item, index) => {
        return {
            kiHieu: `PO - ${item.getAttribute('data-typeindex')}.${index+1}`,
            noiDung: item.value,
            loaiMucTieu: type,
            id: item.getAttribute('data-id'),
            idCTDT: item.getAttribute('data-idctdt')
        }
    })

    value.sort(sortCondition)

    setState(prev => {
        const dataType = prev[type]
        
        return {
            ...prev,
            [type]: {
                ...dataType,
                data: value
            }
        }
    })
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

    value.sort(sortCondition)

    return value
}

const handleClickDeleteC = ({ e, setState, data, setDelete, idctdt, type }) => {
    const parentElement = getParent(e.target, 'element')
    const inputElement = parentElement.querySelector('textarea')
    const dataset = inputElement.dataset
    
    const list = [...data]
    const deleteElement = list[dataset.index - 1]
    list.splice(dataset.index - 1, 1)
    setState(prev => {
        const dataType = prev[type]
        
        return {
            ...prev,
            [type]: {
                ...dataType,
                data: handleChangeDataC(list, dataType.type, dataType.typeIndex, idctdt)
            }
        }
    })
    setDelete(prev => [...prev, deleteElement])
}

const handleClickAddC = ({ idCTDT, type, typeIndex, setState }) => {
    setState(prev => {
        const dataType = prev[type]
        const data = dataType.data

        const list = [
            ...data,
            {
                kiHieu: '',
                loaiMucTieu: '',
                noiDung: '',
                id: '',
                idCTDT: Number.parseInt(idCTDT)
            }
        ]
        
        return {
            ...prev,
            [type]: {
                ...dataType,
                data: handleChangeDataC(list, dataType.type, dataType.typeIndex, idCTDT)
            }
        }
    })
}

const handleUpdateSectionC = async (id, api, setData) => {
    const sectionCElement = JSON.parse(sessionStorage.getItem(`sectionC-${id}`))
    const sectionCDelete = JSON.parse(sessionStorage.getItem(`sectionC-delete-${id}`))

    const deleteElement = sectionCDelete.filter(item => item.id != '').map(item => {
        return {
            id: item.id, 
            idCTDT: item.idCTDT
        }
    })
    const createElement = sectionCElement.filter(item => item.id == '').map(item => {
        return {
                kiHieu:item.kiHieu, 
                noiDung: item.noiDung, 
                loaiMucTieu: item.loaiMucTieu, 
                idCTDT: item.idCTDT
            }
        })
    const updateElement = sectionCElement.filter(item => item.id != '')

    // debugger
    const deleteC = await deleteData(api, '/delete_sectionC', { idCTDT: id, deleteData: deleteElement }, 'DELETE_SECTIONC')
    
    // debugger
    const createC = await postData(api, '/create_sectionC', { idCTDT: id, data: createElement }, 'CREATE_SECIONC')

    // debugger
    const updateC = await postData(api, '/update_sectionC', { idCTDT: id, data: updateElement }, 'UPDATE_SECTIONC')

    if( deleteC.status == 200 &&
        createC.status == 200 &&
        updateC.status == 200) 
    {
        handleSplitSectionC({
            data: updateC.data.data,
            setSectionCValue: setData.setSectionCValue,
            idctdt: id
        })
        setData.setDeleteElement([])
    }

    return (
        deleteC.status == 200 &&
        createC.status == 200 &&
        updateC.status == 200
    )
}

export { 
    handleChangeDataC, 
    handleClickAddC, 
    handleClickDeleteC, 
    handleChangeValueC, 
    handleSplitSectionC, 
    handleUpdateSectionC 
}