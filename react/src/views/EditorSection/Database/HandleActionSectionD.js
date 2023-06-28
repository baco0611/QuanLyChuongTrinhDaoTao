import { deleteData, getParent, postData } from "./HandleUpdateDatabase"

const sortCondition = (a, b) => a.kiHieu < b.kiHieu ? -1 : 1

const handleSplitSectionD = ({ 
    data,
    setSectionDKienThucDHH,
    setSectionDKienThucDHKH,
    setSectionDKienThucLV,
    setSectionDKienThucN,
    setSectionDKienThucNN,
    setSectionDKyNangCM,
    setSectionDKyNangMem,
    setSectionDThaiDoCN,
    setSectionDThaiDoNN,
    setSectionDThaiDoXH,
    idCTDT
}) => {

    const KIEN_THUC = data.filter(item => item.loaiChuanDauRa === 'KIEN_THUC')
    const KY_NANG = data.filter(item => item.loaiChuanDauRa === 'KY_NANG')
    const THAI_DO = data.filter(item => item.loaiChuanDauRa === 'THAI_DO')

    // console.log(KIEN_THUC, KY_NANG, THAI_DO)

    const KIEN_THUC_DHH = KIEN_THUC.filter(item => item.loaiChuanDauRaChiTiet === 'KIEN_THUC_DAI_HOC_HUE')
    KIEN_THUC_DHH.sort(sortCondition)
    setSectionDKienThucDHH(prev => { return {
        ...prev,
        data: handleChangeDataD(KIEN_THUC_DHH, 'KIEN_THUC', 'KIEN_THUC_DAI_HOC_HUE', '1.1', idCTDT)
    }})
        
    const KIEN_THUC_DHKH = KIEN_THUC.filter(item => item.loaiChuanDauRaChiTiet === 'KIEN_THUC_DAI_HOC_KHOA_HOC')
    KIEN_THUC_DHKH.sort(sortCondition)
    setSectionDKienThucDHKH(prev => { return {
        ...prev,
        data: handleChangeDataD(KIEN_THUC_DHKH, 'KIEN_THUC', 'KIEN_THUC_DAI_HOC_KHOA_HOC', '1.2', idCTDT)
    }})
        
    const KIEN_THUC_LV = KIEN_THUC.filter(item => item.loaiChuanDauRaChiTiet === 'KIEN_THUC_LINH_VUC')
    KIEN_THUC_LV.sort(sortCondition)
    setSectionDKienThucLV(prev => { return {
        ...prev,
        data: handleChangeDataD(KIEN_THUC_LV, 'KIEN_THUC', 'KIEN_THUC_LINH_VUC', '1.3', idCTDT)
    }})
        
    const KIEN_THUC_NN = KIEN_THUC.filter(item => item.loaiChuanDauRaChiTiet === 'KIEN_THUC_NHOM_NGANH')
    KIEN_THUC_NN.sort(sortCondition)
    setSectionDKienThucNN(prev => { return {
        ...prev,
        data: handleChangeDataD(KIEN_THUC_NN, 'KIEN_THUC', 'KIEN_THUC_NHOM_NGANH', '1.4', idCTDT)
    }})
        
    const KIEN_THUC_N = KIEN_THUC.filter(item => item.loaiChuanDauRaChiTiet === 'KIEN_THUC_NGANH')
    KIEN_THUC_N.sort(sortCondition)
    setSectionDKienThucN(prev => { return {
        ...prev,
        data: handleChangeDataD(KIEN_THUC_N, 'KIEN_THUC', 'KIEN_THUC_NGANH', '1.5', idCTDT)
    }})
        
    const KY_NANG_CM = KY_NANG.filter(item => item.loaiChuanDauRaChiTiet == 'KY_NANG_CHUYEN_MON')
    KY_NANG_CM.sort(sortCondition)
    setSectionDKyNangCM(prev => { return {
        ...prev,
        data: handleChangeDataD(KY_NANG_CM, 'KY_NANG', 'KY_NANG_CHUYEN_MON', '2.1', idCTDT)
    }})

    const KY_NANG_M = KY_NANG.filter(item => item.loaiChuanDauRaChiTiet == 'KY_NANG_MEM')
    KY_NANG_M.sort(sortCondition)
    setSectionDKyNangMem(prev => { return {
        ...prev,
        data: handleChangeDataD(KY_NANG_M, 'KY_NANG', 'KY_NANG_MEM', '2.2', idCTDT)
    }})

    const THAI_DO_CN = THAI_DO.filter(item => item.loaiChuanDauRaChiTiet == 'THAI_DO_CA_NHAN')
    THAI_DO_CN.sort(sortCondition)
    setSectionDThaiDoCN(prev => { return {
        ...prev,
        data: handleChangeDataD(THAI_DO_CN, 'THAI_DO', 'THAI_DO_CA_NHAN', '3.1', idCTDT)
    }})

    const THAI_DO_NN = THAI_DO.filter(item => item.loaiChuanDauRaChiTiet == 'THAI_DO_NGHE_NGHIEP')
    THAI_DO_NN.sort(sortCondition)
    setSectionDThaiDoNN(prev => { return {
        ...prev,
        data: handleChangeDataD(THAI_DO_NN, 'THAI_DO', 'THAI_DO_NGHE_NGHIEP', '3.2', idCTDT)
    }})

    const THAI_DO_XH = THAI_DO.filter(item => item.loaiChuanDauRaChiTiet == 'THAI_DO_XA_HOI')
    THAI_DO_XH.sort(sortCondition)
    setSectionDThaiDoXH(prev => { return {
        ...prev,
        data: handleChangeDataD(THAI_DO_XH, 'THAI_DO', 'THAI_DO_XA_HOI', '3.3', idCTDT)
    }})
}

// Handle changing value in an input element
const handleChangeValueD = ({ typeDetail, setState }) => {
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

    value.sort((a, b) => a.kiHieu < b.kiHieu ? -1 : 1)

    setState(prev => {
        return {
            ...prev,
            data: value
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

    value.sort((a, b) => a.kiHieu < b.kiHieu ? -1 : 1)

    return value
}

const handleClickAddD = ({ setState, idCTDT, type, typeDetail, typeIndex }) => {
    setState(prev => {

        var stateData = [
            ...prev.data,
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

        stateData = handleChangeDataD(stateData, type, typeDetail, typeIndex, idCTDT)

        const value = {
            ...prev,
            data: stateData
        }
        return value
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
        return {
            ...prev,
            data: handleChangeDataD(list, dataset.type, dataset.typedetail, dataset.typeindex, idctdt)
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