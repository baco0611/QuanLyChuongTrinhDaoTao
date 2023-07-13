import { useState } from 'react'
import BlockDC from './BlockDC'
import BlockCN from './BlockCN'

function RowBlock({ index, title, size, data, value, PLOList }) {
    const [ isHidden, setIsHidden ] = useState(true)

    return (
        <>
            <tr 
                className="title cursorPointer"
                onClick={() => setIsHidden(!isHidden)}
            >
                <td>{index}</td>
                <td colSpan={(size || 3) + 3}>{title}</td>
            </tr>
            {
                !isHidden &&
                <>
                    {
                        data.type=='DAI_CUONG' &&
                        <BlockDC
                            data={data.data}
                            value={value}
                            PLOList={PLOList}
                        />
                        ||
                        <BlockCN
                            data={data}
                            value={value}
                            PLOList={PLOList}
                            size={size}
                        />
                    }
                </>
            }
        </>
    )
}

export default RowBlock