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

export { handleSplitPLO }