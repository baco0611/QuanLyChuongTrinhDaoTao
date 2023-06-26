function PLOBlock({ title, type, idCTDT, data, setState, setDelete}) {

    const PLOSectionName = {
        KIEN_THUC_DAI_HOC_HUE: '1.1. Kiến thức chung trong toàn Đại học Huế (tối đa 2 chuẩn đầu ra)',
        KIEN_THUC_DAI_HOC_KHOA_HOC: '1.2. Kiến thức chung trong trường Đại học Khoa Học (tối đa 2 chuẩn đầu ra)',
        KIEN_THUC_LINH_VUC: '1.3. Kiến thức chung theo lĩnh vực (tối đa 1 chuẩn đầu ra)',
        KIEN_THUC_NHOM_NGANH: '1.4. Kiến thức chung của nhóm ngành (tối đa 1 chuẩn đầu ra)',
        KIEN_THUC_NGANH: '1.5. Kiến thức của ngành (tối đa 5 chuẩn đầu ra)',
        KY_NANG_CHUYEN_MON: '2.1. Kỹ năng chuyên môn (tối đa 5 chuẩn đầu ra)',
        KY_NANG_MEM: '2.2. Kỹ năng mềm (tối đa 3 chuẩn đầu ra)',
        THAI_DO_CA_NHAN: '3.1. Phẩm chất, đạo đức và thái độ của cá nhân (tối đa 2 chuẩn đầu ra)',
        THAI_DO_NGHE_NGHIEP: '3.2. Phẩm chất, đạo đức và thái độ đối với nghề nghiệp (tối đa 2 chuẩn đầu ra)',
        THAI_DO_XA_HOI: '3.3. Phẩm chất, đạo đức và thái độ đối với xã hội (tối đa 2 chuẩn đầu ra)'
    }

    return (
        <div 
            className="section-D-block"
            id={type}
        >
            <h1>{title}</h1>
        </div>
    )
}

export default PLOBlock