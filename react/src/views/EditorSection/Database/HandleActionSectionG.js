import axios from "axios"

const getChuyenNganh = async (data, apiURL, id) => {
    const chuyenNganhValueApi = `${apiURL}/ChuyenNganhDaoTao/${id}`
    let chuyenNganh = []
    await axios.get(chuyenNganhValueApi) 
        .then(response => {
            const restData = response.data
            if(restData.data)
                chuyenNganh = restData
        })
        .catch(error => {
            console.log(error)
            window.location='/error'
        })

    let values = {}

    chuyenNganh.data.forEach(CN => {
        const value = data.filter(item => item.idChuyenNganh == CN.idChuyenNganh && item.thayTheKhoaLuan == false)
        values[CN.idChuyenNganh] = {
            idChuyenNganh: CN.idChuyenNganh,
            tenChuyenNganh: CN.tenChuyenNganh,
            data: value
        }
    })

    console.log(values)
    return values
}

const handleSplitSectionG = async (data, setState, apiURL, id) => {
    const DAI_CUONG = data.filter(item => item.khoiKienThuc == 'DAI_CUONG')
    
    setState(prev => {
        const DAI_CUONGValue = prev.DAI_CUONG

        return {
            ...prev,
            DAI_CUONG: {
                ...DAI_CUONGValue,
                data: DAI_CUONG
            }
        }
    })

    const CO_SO_NGANH = data.filter(item => item.chiTietKhoiKienThuc == 'CO_SO_NGANH')
    const NGANH = data.filter(item => item.chiTietKhoiKienThuc == 'NGANH')
    const BO_TRO = data.filter(item => item.chiTietKhoiKienThuc == 'BO_TRO')
    const THUC_TAP = data.filter(item => item.chiTietKhoiKienThuc == 'THUC_TAP')
    const DO_AN_KHOA_LUAN = data.filter(item => item.chiTietKhoiKienThuc == 'DO_AN_KHOA_LUAN' && item.thayTheKhoaLuan == false)
    const THAY_THE_KHOA_LUAN = data.filter(item => item.chiTietKhoiKienThuc == 'DO_AN_KHOA_LUAN' && item.thayTheKhoaLuan == true)
    
    const CHUYEN_NGANH = await getChuyenNganh(data, apiURL, id)

    setState(prev => {
        return {
            ...prev,
                CHUYEN_NGHIEP: {
                    type: 'CHUYEN_NGHIEP',
                CO_SO_NGANH: {
                    data: CO_SO_NGANH,
                    type: 'CO_SO_NGANH',    
                },
                NGANH: {
                    data: NGANH,
                    type: 'NGANH',    
                },
                BO_TRO: {
                    data: BO_TRO,
                    type: 'BO_TRO',    
                },
                THUC_TAP: {
                    data: THUC_TAP,
                    type: 'THUC_TAP',    
                },
                DO_AN_KHOA_LUAN: {
                    data: DO_AN_KHOA_LUAN,
                    type: 'DO_AN_KHOA_LUAN',
                },
                THAY_THE_KHOA_LUAN: {
                    data: THAY_THE_KHOA_LUAN,
                    type: 'THAY_THE_KHOA_LUAN'
                },
                CHUYEN_NGANH: {
                    data: CHUYEN_NGANH,
                    type: 'CHUYEN_NGANH'   
                }
            }
        }
    })
}

export { handleSplitSectionG }