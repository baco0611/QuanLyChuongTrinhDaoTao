const handleChangeValue = ({ type, setState }) => {
    const element = document.querySelectorAll(`input[data-type='${type}']`)

    const value = Array.from(element).map(item => {
        return {
            kiHieu: `PO - ${item.getAttribute('data-typeindex')}.${item.getAttribute('data-index')}`,
            noiDung: item.value,
            loaiMucTieu: type,
            id: item.getAttribute('data-id')
        }
    })

    setState(value)
}

export { handleChangeValue }