import { useState } from "react"
import SectionGCN from "./SectionGCN"
import SectionGDC from "./SectionGDC"

function SectionGBlock({ title, index, data, setState }) {
    const [ isHidden, setIsHidden ] = useState(true)

    return (
        <>
            <tr 
                className="title cursorPointer"
                onClick={() => setIsHidden(!isHidden)}
            >
                <td>{index}</td>
                <td colSpan={13}>{title}</td>            
            </tr>
            {
                !isHidden &&
                <>
                    {
                        data.type == 'DAI_CUONG' 
                        &&
                            <SectionGDC
                                data={data}
                                setState={setState}
                            />
                        ||
                            <SectionGCN
                                data={data}
                                setState={setState}
                            />
                    }
                </>
            }
        </>
    )
}

export default SectionGBlock