import { useParams } from "react-router-dom"
import { handleChangeValue, handleClickDelete } from "../Database/HandleAction"

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
            <input 
                id={`${type}-${index}`}
                placeholder="Mục tiêu cụ thể"
                value={item.noiDung}    
                data-typeindex={typeIndex}
                data-type={type}
                data-index={index+1}
                data-id={item.id}
                onChange={() => handleChangeValue({ type, setState })}
                data-idctdt={id}
            />
            <button 
                className="minus"
                onClick={(e) => {handleClickDelete({ e, setState, data: sourceData, setDelete, idctdt: Number.parseInt(id) })}}
            >
                <i className="iconoir-minus-square"></i>
            </button>
        </div>
    )
}

export default POElement