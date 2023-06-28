import axios from "axios"
import { handleUpdateSectionC } from "./HandleActionSectionC"
import { handleUpdateSectionA } from "./HandelActionSectionA"
import { handleUpdateSectionB } from "./HandelActionSectionB"

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

function getParent(element, className) {
    while(element.parentElement) {
        if(element.parentElement.className == className)
            return element.parentElement
        
        element = element.parentElement
    }
}

export { handleUpdateDatabase, getParent, postData, deleteData}