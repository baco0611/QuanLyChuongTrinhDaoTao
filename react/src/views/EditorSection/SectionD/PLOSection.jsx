import { Droppable } from "react-beautiful-dnd"
import { handleClickAddD } from "../Database/HandleActionSectionD"
import PLOElement from "./PLOElement"

function PLOSection({ type, idCTDT, data, setState, setDelete }) {

    const PLOSectionTitle = {
        KIEN_THUC_DAI_HOC_HUE: '1.1. Kiến thức chung trong toàn Đại học Huế',
        KIEN_THUC_DAI_HOC_KHOA_HOC: '1.2. Kiến thức chung trong trường Đại học Khoa Học',
        KIEN_THUC_LINH_VUC: '1.3. Kiến thức chung theo lĩnh vực',
        KIEN_THUC_NHOM_NGANH: '1.4. Kiến thức chung của nhóm ngành',
        KIEN_THUC_NGANH: '1.5. Kiến thức của ngành',
        KY_NANG_CHUYEN_MON: '2.1. Kỹ năng chuyên môn',
        KY_NANG_MEM: '2.2. Kỹ năng mềm',
        THAI_DO_CA_NHAN: '3.1. Phẩm chất, đạo đức và thái độ của cá nhân',
        THAI_DO_NGHE_NGHIEP: '3.2. Phẩm chất, đạo đức và thái độ đối với nghề nghiệp',
        THAI_DO_XA_HOI: '3.3. Phẩm chất, đạo đức và thái độ đối với xã hội'
    }

    const PLOtypeIndex = {
        KIEN_THUC_DAI_HOC_HUE: '1.1',
        KIEN_THUC_DAI_HOC_KHOA_HOC: '1.2',
        KIEN_THUC_LINH_VUC: '1.3',
        KIEN_THUC_NHOM_NGANH: '1.4',
        KIEN_THUC_NGANH: '1.5',
        KY_NANG_CHUYEN_MON: '2.1',
        KY_NANG_MEM: '2.2',
        THAI_DO_CA_NHAN: '3.1',
        THAI_DO_NGHE_NGHIEP: '3.2',
        THAI_DO_XA_HOI: '3.3'
    }

    return (
        <Droppable
            droppableId={`${data.typeDetail}`}
            type="PLO"
        >
        {
            provider => (
                <div 
                    id={data.typeDetail} 
                    className="section-D-section"
                    ref={provider.innerRef}
                    {...provider.droppableProps}
                >
                    <h2>{PLOSectionTitle[data.typeDetail]}</h2>
                    <div className="section-D-containt">
                        <header className="element">
                            <h4>Kí hiệu</h4>
                            <h4>Chủ đề chuẩn đầu ra</h4>
                            <h4 className="element-question">
                                Thang đánh giá năng lực 
                                <i className="iconoir-help-circle cursorPointer"/>
                            </h4>
                            <button
                                onClick={() => handleClickAddD({ setState, idCTDT, type, typeDetail: data.typeDetail, typeIndex: PLOtypeIndex[data.typeDetail] })}
                            >
                                <i className="iconoir-add-square"></i>
                            </button>
                        </header>
                        {
                            data.data.map((item, index) => {
                                return (
                                    <PLOElement 
                                        item={item}
                                        key={index}
                                        type={type}
                                        typeDetail={data.typeDetail}
                                        typeIndex={PLOtypeIndex[data.typeDetail]}
                                        setState={setState}
                                        data={data.data}
                                        setDelete={setDelete}
                                        index={index}
                                    />
                                )
                            })
                        }
                    </div>
                    {provider.placeholder}
                </div>
            )
        }
        </Droppable>
    )
}

export default PLOSection