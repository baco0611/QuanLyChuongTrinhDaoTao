import { postData } from "./HandleUpdateDatabase"

const handleUpdateSectionB = (id, api) => {
    const sectionBValue = JSON.parse(localStorage.getItem(`sectionB-${id}`))

    return postData(api, '/update_sectionB', sectionBValue, 'UPDATE_SECTIONB')
}

export { handleUpdateSectionB }