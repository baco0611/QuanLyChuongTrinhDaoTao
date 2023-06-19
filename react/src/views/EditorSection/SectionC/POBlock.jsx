import POElement from "./POElement"

function POBlock({ data, title, type }) {
    return (
        <div className="section-C-block">
            <h1>{title}</h1>
            <div id="section-C-containt">
                <header className="element">
                    <h4>Kí hiệu</h4>
                    <h4>Chủ đề mục tiêu cụ thể</h4>
                    <button>
                        <i className="iconoir-add-square"></i>
                    </button>
                </header>
                {
                    data.map((item, index) => {
                        return (
                            <POElement
                                key={index}
                                item={item}
                                type={type}
                                index={index}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default POBlock