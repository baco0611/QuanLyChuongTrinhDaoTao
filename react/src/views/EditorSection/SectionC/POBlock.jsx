import { Draggable, Droppable } from "react-beautiful-dnd"
import POElement from "./POElement"
import { handleClickAddC } from "../Database/HandleActionSectionC"
import { useState } from "react"

function POBlock({ title, data, setDelete, idCTDT, setState }) {

    const [ isHidden, setIsHidden ] = useState(true)

    return (
        <Droppable 
            droppableId={`${data.type}`}
            type="PO"
        >
        {
            provided => (
                <div 
                    className="section-C-block" 
                    id={data.type} 
                    ref={provided.innerRef} 
                    {...provided.droppableProps}
                >
                    <h1 onClick={() => setIsHidden(!isHidden)}>{title}</h1>
                    {
                        !isHidden &&
                        <div className="section-C-containt">
                            <header className="element">
                                <h4>Kí hiệu</h4>
                                <h4>Chủ đề mục tiêu cụ thể</h4>
                                <button
                                    onClick={() => handleClickAddC({ idCTDT, type: data.type, typeIndex: data.typeIndex, setState })}
                                >
                                    <i className="iconoir-add-square"></i>
                                </button>
                            </header>
                            {
                                data.data.map((item, index) => {
                                    return (
                                        <POElement
                                            key={index}
                                            item={item}
                                            type={data.type}
                                            typeIndex={data.typeIndex}
                                            index={index}
                                            provided={provided}
                                            innerRef={provided.innerRef}
                                            setState={setState}
                                            data={data}
                                            setDelete={setDelete}
                                        />
                                    )
                                })
                            }
                        </div>
                    }
                    {provided.placeholder}
                </div>
            )
        }
        </Droppable>
    )
}

export default POBlock