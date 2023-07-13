import React from 'react'

function InputElement({ hocPhanId, list, value}) {
    

    return (
        <>
            {
                list.map((PLO, index) => {
                    const data_plo = PLO.id

                    return (
                        <td key={index} className='input'>
                            <input 
                                data-plo={data_plo}
                                data-hp={hocPhanId}
                                type='text'
                            />
                        </td>
                    )
                })
            }
        </>
    )
}

function InputBlock({ PLOList, value, hocPhanId}) {
    return (
        <>
            <InputElement
                hocPhanId={hocPhanId}
                list={PLOList.KIEN_THUC.data}
                value={value}
            />
            <InputElement
                hocPhanId={hocPhanId}
                list={PLOList.KY_NANG.data}
                value={value}
            />
            <InputElement
                hocPhanId={hocPhanId}
                list={PLOList.THAI_DO.data}
                value={value}
            />
        </>
    )
}

export default InputBlock