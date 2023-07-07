import { deleteData, postData } from "./HandleUpdateDatabase"

const handleChangValueE = (setState, valueList) => {
    const value = {...valueList}
    const inputElement = document.querySelectorAll('input')
    const element = Array.from(inputElement).filter(item => item.checked == true)

    const state = element.map(item => {
        const dataSet = item.dataset
        console.log(dataSet)
        if(dataSet.id && dataSet.id!='false')
            return {
                PLO: dataSet.plo,
                PO: dataSet.po,
                id: dataSet.id,
                isCheck: item.checked
            }
        else 
            return {
                PLO: dataSet.plo,
                PO: dataSet.po,
                id: '',
                isCheck: item.checked
            }
    })

    Object.keys(value).forEach(PLO => {
        Object.keys(value[PLO]).forEach(PO => {
            value[PLO][PO].isCheck = false
        })
    })

    state.forEach(item => {
        let { PLO, PO, id } = item

        if(!value[PLO]) {
            value[PLO] = {
                [PO]: {
                    id,
                    isCheck: true
                }
            }     
        } else value[PLO][PO] = {id, isCheck: true}
    })

    const stateValue = []

    Object.keys(value).forEach(PLO => {
        Object.keys(value[PLO]).forEach(PO => {
            stateValue.push({
                PLO,
                PO,
                id: value[PLO][PO].id,
                isCheck: value[PLO][PO].isCheck
            })
        })
    })

    console.log(stateValue)
    setState(stateValue)
}

const handleUpdateSectionE = ( id, api) => {
    const inputElement = Array.from(document.querySelectorAll('input'))

    const checkedElement = inputElement.filter(item => item.checked)
    const uncheckedElement = inputElement.filter(item => !item.checked)
    
    const deleteElement = uncheckedElement.filter(item => item.getAttribute('data-id')!='false')
    const createElement = checkedElement.filter(item => item.getAttribute('data-id')=='false')

    const deleteValue = deleteElement.map(item => item.dataset.id)
    const createValue = createElement.map(item => {
        const dataset = item.dataset

        return {
            PO: dataset.po,
            PLO: dataset.plo
        }
    })

    postData(api, '/create_sectionE', { idCTDT: id, data: createValue }, 'CREATE_SECTIONE')
    deleteData(api, '/delete_sectionE', { idCTDT: id, deleteData: deleteValue }, 'DELETE_SECTIONE')
}

const convertValueE = (value) => {
    if(value)
        return value.map(item => {
            return {
                ...item,
                isCheck: true
            }
        })
    else 
        return []
}


export { handleChangValueE, handleUpdateSectionE, convertValueE }