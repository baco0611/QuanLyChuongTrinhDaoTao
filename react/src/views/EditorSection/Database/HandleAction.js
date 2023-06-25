import axios from "axios"

const postData = async (api, url, payload, completeMessage, errorMessage) => {
    const apiURL = api + url
    const result =
    await axios.post(apiURL, payload)
        .then(response => {
            console.log(completeMessage ? completeMessage : '', response)
            return response
        })
        .catch(err => {
            console.log(errorMessage ? errorMessage : '', err)
            return err
        })

    return {
        data: result.data,
        status: result.status
    }
}

const deleteData = (api, url, payload, completeMessage, errorMessage) => {
    const apiURL = api + url
    axios.delete(apiURL, {
        data: payload
    })
        .then(response => {
            console.log(completeMessage ? completeMessage : '', response)
        })
        .catch(err => {
            console.log(errorMessage ? errorMessage : '', err)
        })
}

const handleUpdateSectionA = (id, api) => {
    const sectionAValue = JSON.parse(localStorage.getItem(`sectionA-${id}`))

    const payloadData = new FormData()

    Object.keys(sectionAValue).forEach(key => {
        payloadData.append(key, sectionAValue[key])
    })

    return postData(api, '/update_sectionA', payloadData, 'UPDATE_SECTIONA', 'SOMETHING HAS BEEN INTERESTED WITH THE UPDATE')
}

const handleUpdateSectionB = (id, api) => {
    const sectionBValue = JSON.parse(localStorage.getItem(`sectionB-${id}`))

    return postData(api, '/update_sectionB', sectionBValue, 'UPDATE_SECTIONB')
}

const handleUpdateSectionC = (id, api) => {
    const sectionCElement = JSON.parse(localStorage.getItem(`sectionC-${id}`))
    const sectionCDelete = JSON.parse(localStorage.getItem(`sectionC-delete-${id}`))

    const deleteElement = sectionCDelete.filter(item => item.id != '').map(item => {return {id: item.id, idCTDT: item.idCTDT}})
    const createElement = sectionCElement.filter(item => item.id == '').map(item => {return {kiHieu:item.kiHieu, noiDung: item.noiDung, loaiMucTieu: item.loaiMucTieu, idCTDT: item.idCTDT}})
    const updateElement = sectionCElement.filter(item => item.id != '')

    var check = true
    console.log(deleteElement, createElement, updateElement)

    // debugger
    if(createElement.length <= 0) console.log('CREATE_SECTIONC')
    else postData(api, '/create_sectionC', { data: createElement }, 'CREATE_SECIONC')
    
    // debugger
    if(deleteElement.length <= 0) console.log('DELETE_SECTIONC')
    else deleteData(api, '/delete_sectionC', { deleteData: deleteElement }, 'DELETE_SECTIONC')
    
    // debugger
    if(updateElement.length <= 0) console.log('UPDATE_SECTIONC')
    else postData(api, '/update_sectionC', { data: updateElement }, 'UPDATE_SECTIONC')

    return check
}

const handleUpdateDatabase = ({ currentSection, currentId, api, thisE }) => {
    var isSuccess = true
    switch(currentSection) {
        case 'A':
            isSuccess = isSuccess && handleUpdateSectionA(currentId, api)
            break
        case 'B':
            isSuccess = isSuccess && handleUpdateSectionB(currentId, api)
            break
        case 'C':
            isSuccess = isSuccess && handleUpdateSectionC(currentId, api)
            break
    }

    console.log(thisE, isSuccess)
}



// For SECTION C

const sortCondition = (a, b) => a.kiHieu < b.kiHieu ? -1 : 1

const handleSplitSection = ({ data, setSectionCKienThuc, setSectionCKyNang, setSectionCThaiDo }) => {
    const idctdt = data[0].idCTDT

    const KIEN_THUC = data.filter(item => item.loaiMucTieu === 'KIEN_THUC')
    KIEN_THUC.sort(sortCondition)
    setSectionCKienThuc(handleChangeData(KIEN_THUC, 'KIEN_THUC', 1, idctdt))

    const KY_NANG = data.filter(item => item.loaiMucTieu === 'KY_NANG')
    KY_NANG.sort(sortCondition)
    setSectionCKyNang(handleChangeData(KY_NANG, 'KY_NANG', 2, idctdt))

    const THAI_DO = data.filter(item => item.loaiMucTieu === 'THAI_DO')
    THAI_DO.sort(sortCondition)
    setSectionCThaiDo(handleChangeData(THAI_DO, 'THAI_DO', 3, idctdt))
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