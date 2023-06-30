import { postData } from "./HandleUpdateDatabase"

const handleUpdateSectionA = (id, api) => {
    const sectionAValue = JSON.parse(localStorage.getItem(`sectionA-${id}`))

    const payloadData = new FormData()

    Object.keys(sectionAValue).forEach(key => {
        payloadData.append(key, sectionAValue[key])
    })

    return postData(api, '/update_sectionA', payloadData, 'UPDATE_SECTIONA', 'SOMETHING HAS BEEN INTERESTED WITH THE UPDATE')
}

export { handleUpdateSectionA }