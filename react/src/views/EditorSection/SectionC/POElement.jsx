function POElement({ item, type, index }) {
    return (
        <div className="element">
            <label htmlFor={`${type}-${index}`}>{item.kiHieu}</label>
            <input 
                id={`${type}-${index}`}
                placeholder="Mục tiêu cụ thể"
                value={item.noiDung}    
            />
            <button className="minus">
                <i className="iconoir-minus-square"></i>
            </button>
        </div>
    )
}

export default POElement