import { deleteData, getParent, postData } from "./HandleUpdateDatabase"

const sortCondition = (a, b) => {
    const aKiHieu = a.kiHieu.split('.')
    const bKiHieu = b.kiHieu.split('.')

    const aK = Number.parseInt(aKiHieu.pop())
    const bK = Number.parseInt(bKiHieu.pop())

    return aK < bK ? -1 : 1
}

const handleSplitSectionD = ({ data, setSectionDValue, idCTDT }) => {
    const typeList = [
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_DAI_HOC_HUE'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_DAI_HOC_KHOA_HOC'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_LINH_VUC'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_NHOM_NGANH'},
        {type: 'KIEN_THUC', typeDetail: 'KIEN_THUC_NGANH'},
        {type: 'KY_NANG', typeDetail: 'KY_NANG_CHUYEN_MON'},
        {type: 'KY_NANG', typeDetail: 'KY_NANG_MEM'},
        {type: 'THAI_DO', typeDetail: 'THAI_DO_CA_NHAN'},
        {type: 'THAI_DO', typeDetail: 'THAI_DO_NGHE_NGHIEP'},
        {type: 'THAI_DO', typeDetail: 'THAI_DO_XA_HOI'}
    ]

    typeList.forEach(item => {
        const type = item.type
        const typeDetail = item.typeDetail

        const value = data.filter(element => element.loaiChuanDauRa === type && element.loaiChuanDauRaChiTiet === typeDetail)
        setSectionDValue(prev => {
            const typeData = prev[type]
            const typeDetailData = typeData[typeDetail]

            return {
                ...prev,
                [type]: {
                    ...typeData,
                    [typeDetail]: {
                        ...typeDetailData,
                        data: handleChangeDataD(value, type, typeDetail, typeDetailData.typeIndex, idCTDT)
                    }
                }
            }
        })
    })
}

// Handle changing value in an input element
const handleChangeValueD = ({ typeDetail, setState, type }) => {
    const element = document.querySelectorAll(`#${typeDetail} div.element`)

    const value = Array.from(element).map((item, index) => {
        const textarea = item.querySelector('textarea')
        const input = item.querySelector('input')
        
        return {
            kiHieu: `PLO - ${textarea.getAttribute('data-typeindex')}.${index+1}`,
            noiDung: textarea.value,
            loaiChuanDauRa: textarea.getAttribute('data-type'),
            loaiChuanDauRaChiTiet: textarea.getAttribute('data-typedetail'),
            trinhDoNangLuc: input.value != '0' ? input.value : '',
            id: textarea.getAttribute('data-id'),
            idCTDT: textarea.getAttribute('data-idCTDT')
        }
    })

    value.sort(sortCondition)

    setState(prev => {
        const typeData = prev[type]
        const typeDetailData = typeData[typeDetail]

        return {
            ...prev,
            [type]: {
                ...typeData,
                [typeDetail]: {
                    ...typeDetailData,
                    data: value
                }
            }
        }
    })
}

// Handle changing many thing (like drop, ...)
const handleChangeDataD = (element, type, typeDetail, typeIndex, idCTDT) => {
    const value = element.map((item, index) => {
        return {
            kiHieu: `PLO - ${typeIndex}.${index+1}`,
            noiDung: item.noiDung,
            loaiChuanDauRa: type,
            loaiChuanDauRaChiTiet: typeDetail,
            id: item.id,
            idCTDT: idCTDT,
            trinhDoNangLuc: item.trinhDoNangLuc != '0' ? item.trinhDoNangLuc : ''
        }
    })

    value.sort(sortCondition)

    return value
}

const handleClickAddD = ({ setState, idCTDT, type, typeDetail, typeIndex }) => {
    setState(prev => {
        const typeData = prev[type]
        const typeDetailData = typeData[typeDetail]

        const value = [
            ...typeDetailData.data,
            {
                id: '',
                idCTDT: idCTDT,
                kiHieu: '',
                noiDung: '',
                loaiChuanDauRa: '',
                loaiChuanDauRaChiTiet: '',
                trinhDoNangLuc: ''
            }
        ]

        return {
            ...prev,
            [type]: {
                ...typeData,
                [typeDetail]: {
                    ...typeDetailData,
                    data: handleChangeDataD(value, type, typeDetail, typeIndex, idCTDT)
                }
            }
        }
    })
}

const handleClickDeleteD = ({  e, setState, data , setDelete, idctdt }) => {
    const parentElement = getParent(e.target, 'element')
    const inputElement = parentElement.querySelector('textarea')
    const dataset = inputElement.dataset

    const list = [...data]
    const deleteElement = list[dataset.index - 1]
    list.splice(dataset.index - 1, 1)

    setState(prev => {
        const type = dataset.type
        const typeDetail = dataset.typedetail
        const typeData = prev[type]
        const typeDetailData = typeData[typeDetail]

        return {
            ...prev,
            [type]: {
                ...typeData,
                [typeDetail]: {
                    ...typeDetailData,
                    data: handleChangeDataD(list, type, typeDetail, typeDetailData.typeIndex, idctdt)
                }
            }
        }
    })
    setDelete(prev => [...prev, deleteElement])
}

const handleUpdateSectionD = (id, api) => {
    const sectionDElement = JSON.parse(localStorage.getItem(`sectionD-${id}`))
    const sectionDDelete = JSON.parse(localStorage.getItem(`sectionD-delete-${id}`))

    const deleteElement = sectionDDelete.filter(item => item.id != '').map(item => {
        return {
            id: item.id, 
            idCTDT: item.idCTDT
        }
    })
    const createElement = sectionDElement.filter(item => item.id == '').map(item => {
        return {
            kiHieu:item.kiHieu, 
            noiDung: item.noiDung, 
            loaiChuanDauRa: item.loaiChuanDauRa,
            loaiChuanDauRaChiTiet: item.loaiChuanDauRaChiTiet,
            trinhDoNangLuc: item.trinhDoNangLuc,
            idCTDT: item.idCTDT
        }
    })
    const updateElement = sectionDElement.filter(item => item.id != '')

    // debugger
    if(deleteElement.length <= 0) console.log('DELETE_SECTIOND')
    else deleteData(api, '/delete_sectionD', { idCTDT: id, deleteData: deleteElement }, 'DELETE_SECTIOND')
    
    // debugger
    if(createElement.length <= 0) console.log('CREATE_SECTIOND')
    else postData(api, '/create_sectionD', { idCTDT: id, data: createElement }, 'CREATE_SECIOND')

    // debugger
    if(updateElement.length <= 0) console.log('UPDATE_SECTIOND')
    else postData(api, '/update_sectionD', { idCTDT: id, data: updateElement }, 'UPDATE_SECTIOND')
}

export { handleSplitSectionD, handleChangeValueD, handleClickAddD, handleClickDeleteD, handleChangeDataD, handleUpdateSectionD }