import { handleChangeValue } from "../Database/updateDatabase"

function POElement({ item, type, index, typeIndex, setState }) {
    return (
        <div className="element">
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
            />
            <button className="minus">
                <i className="iconoir-minus-square"></i>
            </button>
        </div>
    )
}

export default POElement