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
    if(deleteElement.length <= 0) console.log('DELETE_SECTIONC')
    else deleteData(api, '/delete_sectionC', { deleteData: deleteElement }, 'DELETE_SECTIONC')
    
    // debugger
    if(createElement.length <= 0) console.log('CREATE_SECTIONC')
    else postData(api, '/create_sectionC', { data: createElement }, 'CREATE_SECIONC')

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

// For SectionD

function getParent(element, className) {
    while(element.parentElement) {
        if(element.parentElement.className == className)
            return element.parentElement
        
        element = element.parentElement
    }
}

export { handleUpdateDatabase, getParent}