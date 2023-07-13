import { deleteData, postData } from "./HandleUpdateDatabase"

const sortCondition = (a, b) => {
    const aKiHieu = a.kiHieu.split('.')
    const bKiHieu = b.kiHieu.split('.')

    const [ a1, a2, a3 ] = aKiHieu
    const [ b1, b2, b3 ] = bKiHieu

    if(a1 == b1)
        if(a2 == b2)
            return a3 < b3 ? -1 : 1
        else
            return a2 < b2 ? -1 : 1
    else
        return a1 < b1 ? -1 : 1
}

const handleSplitPLO = ({ data, setState }) => {
    const KIEN_THUC = data.filter(item => item.loaiChuanDauRa == 'KIEN_THUC')
    const KY_NANG = data.filter(item => item.loaiChuanDauRa == 'KY_NANG')
    const THAI_DO = data.filter(item => item.loaiChuanDauRa == 'THAI_DO')

    setState({
        KIEN_THUC: {
            type: 'KIEN_THUC',
            data: KIEN_THUC.sort(sortCondition)
        },
        KY_NANG: {
            type: 'KY_NANG',
            data: KY_NANG.sort(sortCondition)
        },
        THAI_DO: {
            type: 'THAI_DO',
            data: THAI_DO.sort(sortCondition)
        }
    })
}

const handleChangeValueH = (setState, valueList) => {
    const value = {...valueList}
    const inputElement = document.querySelectorAll('input')
    const element = Array.from(inputElement).filter(item => item.value != '')

    // console.log(data_hocPhan, data_plo, e.target.value)
    
    const state = element.map(item => {
        const dataSet = item.dataset
        let value = Number(item.value)
        if(Number.isInteger(value) && value>=1 && value<=5)
            if(dataSet.id && dataSet!='false') {
                return {
                    PLO: dataSet.plo,
                    idCTCT: dataSet.hp,
                    id: dataSet.id,
                    mucDoDapUng: item.value
                }
            } else 
                return {
                    PLO: dataSet.plo,
                    idCTCT: dataSet.hp,
                    id: '',
                    mucDoDapUng: item.value
                }
        else 
            return undefined
    }).filter(item => item != undefined)

    Object.keys(value).forEach(CTCT => {
        Object.keys(value[CTCT]).forEach(PLO => {
            value[CTCT][PLO].mucDoDapUng = ''
        })
    })

    state.forEach(item => {
        let { PLO, idCTCT, mucDoDapUng, id } = item

        if(!value[idCTCT]) {
            value[idCTCT] = {
                [PLO]: {
                    id,
                    mucDoDapUng
                }
            } 
        } else value[idCTCT][PLO] = {id, mucDoDapUng}
    })

    const stateValue = []

    Object.keys(value).forEach(CTCT => {
        Object.keys(value[CTCT]).forEach(PLO => {
            stateValue.push({
                idCTCT: CTCT,
                PLO,
                id: value[CTCT][PLO].id,
                mucDoDapUng: value[CTCT][PLO].mucDoDapUng
            })
        })
    })

    console.log(stateValue)
    setState(stateValue)
}

const handleUpdateSectionH = (id, api) => {
    const value = JSON.parse(localStorage.getItem(`sectionH-${id}`))

    const createElement = value.filter(item => item.mucDoDapUng!='' && item.id=='')
    const deleteElement = value.filter(item => item.mucDoDapUng=='' && item.id!='')
    const updateElement = value.filter(item => item.mucDoDapUng!='' && item.id!='')

    const createPayload = {
        idCTDT: id,
        data: createElement.map(item => ({
            PLO: item.PLO,
            idCTCT: item.idCTCT,
            mucDoDapUng: item.mucDoDapUng
        }))
    }

    const deletePayload = {
        idCTDT: id,
        deleteData: deleteElement.map(item => item.id)
    }

    const updatePayload = {
        idCTDT: id,
        data: updateElement.map(item => ({
            id: item.id,
            mucDoDapUng: item.mucDoDapUng
        }))
    }
    
    if(createElement.length > 0) postData(api, '/create_sectionH', createPayload, 'CREATE_SECTIONH')
    else console.log('CREATE_SECTIONH')

    if(deleteElement.length > 0) deleteData(api, '/delete_sectionH', deletePayload, 'DELETE_SECTIONH')
    else console.log('DELETE_SECTIONH')

    if(updateElement.length > 0) postData(api, '/update_sectionH', updatePayload, 'UPDATE_SECTIONH')
    else console.log('UPDATE_SECTIONH')

    console.log(deletePayload)
}

export { handleSplitPLO, handleChangeValueH, handleUpdateSectionH }