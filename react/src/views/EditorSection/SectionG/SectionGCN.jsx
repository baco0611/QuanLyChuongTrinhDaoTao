import SectionGSection from "./SectionGSection"

function SectionGCN({ data, setState }) {
    return (
        <>
            <SectionGSection
                title={'Kiến thức cơ sở ngành'}
                index={'a'}
                data={data.CO_SO_NGANH}
                setState={setState}
            />
            <SectionGSection
                title={'Kiến thức ngành'}
                index={'b'}
                data={data.NGANH}
                setState={setState}
            />
            <SectionGSection
                title={'Kiến thức bổ trợ'}
                index={'c'}
                data={data.BO_TRO}
                setState={setState}
            />
            <SectionGSection
                title={'Kiến thức thực tập, thực tế'}
                index={'d'}
                data={data.THUC_TAP}
                setState={setState}
            />
            <SectionGSection
                title={'ĐATN, KLTN hoặc học phần thay thế KLTN'}
                index={'e'}
                data={data.DO_AN_KHOA_LUAN}
                setState={setState}
            />
        </>
    )
}

export default SectionGCN