import { Draggable, Droppable } from "react-beautiful-dnd"
import POElement from "./POElement"
import { handleClickAddC } from "../Database/HandleActionSectionC"

function POBlock({ data, title, type, setState, setDelete, idCTDT }) {
    
    const POType = {
        KIEN_THUC: 1,
        KY_NANG: 2,
        THAI_DO: 3
    }

    
    return (
        <Droppable 
            droppableId={`${type}`}
            type="PO"
        >
        {
            provided => (
                <div 
                    className="section-C-block" 
                    id={type} 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <h1>{title}</h1>
                    <div className="section-C-containt">
                        <header className="element">
                            <h4>Kí hiệu</h4>
                            <h4>Chủ đề mục tiêu cụ thể</h4>
                            {
                                data.length < 5 &&
                                <button
                                    onClick={() => handleClickAddC({ setState, idCTDT, type, typeIndex: POType[type] })}
                                >
                                    <i className="iconoir-add-square"></i>
                                </button>
                            }
                        </header>
                        {
                            data.map((item, index) => {
                                return (
                                    <POElement
                                        key={index}
                                        item={item}
                                        type={type}
                                        typeIndex={POType[type]}
                                        index={index}
                                        setState={setState}
                                        provided={provided}
                                        innerRef={provided.innerRef}
                                        data={data}
                                        setDelete={setDelete}
                                    />
                                )
                            })
                        }
                    </div>
                    {provided.placeholder}
                </div>
            )
        }
        </Droppable>
    )
}

export default POBlock