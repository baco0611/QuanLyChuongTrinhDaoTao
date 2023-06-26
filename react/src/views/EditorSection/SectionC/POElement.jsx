import { useParams } from "react-router-dom"
import { handleChangeValueC, handleClickDeleteC } from "../Database/HandleActionSectionC"

function POElement({ item, type, index, typeIndex, setState, provided, data, setDelete }) {

    const { id } = useParams()
    const sourceData = data

    return (
        <div 
            className="element"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
        >
            <label htmlFor={`${type}-${index}`}>{item.kiHieu}</label>
            <textarea 
                id={`${type}-${index}`}
                placeholder="Mục tiêu cụ thể"
                value={item.noiDung}    
                data-typeindex={typeIndex}
                data-type={type}
                data-index={index+1}
                data-id={item.id}
                onChange={() => handleChangeValueC({ type, setState })}
                data-idctdt={id}
                onInput={(e) => {
                    e.target.style.height = 'auto'
                    e.target.style.height = `${e.target.scrollHeight}px`
                }}
            />
            <button 
                className="minus"
                onClick={(e) => {handleClickDeleteC({ e, setState, data: sourceData, setDelete, idctdt: Number.parseInt(id) })}}
            >
                <i className="iconoir-minus-square"></i>
            </button>
        </div>
    )
}

export default POElement