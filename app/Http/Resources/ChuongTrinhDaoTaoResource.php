<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChuongTrinhDaoTaoResource extends JsonResource
{
    
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    
    public function toArray($request)
    {
        return [
                'id' => $this->idChuongTrinh,
                "tenTiengViet"=>strval($this->tenTiengViet),
                "tenTiengAnh" =>strval($this->tenTiengAnh),
                "trinhDoDaoTao"=>strval($this->trinhDoDaoTao),
                "maNganhDaoTao"=>strval($this->maNganhDaoTao),
                "tenNganhDaoTao"=>strval($this->tenNganhDaoTao),
                "khoaQuanLyChuongTrinh"=>strval($this->khoaQuanLyChuongTrinh),
                "doiTuongTuyenSinh"=>strval($this->doiTuongTuyenSinh),
                "thoiGianDaoTao"=>strval($this->thoiGianDaoTao),
                "loaiHinhDaoTao"=>strval($this->loaiHinhDaoTao),
                "soTinChiYeuCauTichLuy"=>strval($this->soTinChiYeuCauTichLuy),
                "dieuKienTotNghiep"=>strval($this->dieuKienTotNghiep),
                "vanBangTotNghiep"=>strval($this->vanBangTotNghiep),
                "khaNangNangCaoTrinhDo"=>strval($this->khaNangNangCaoTrinhDo),
                "viTriViecLamSauTotNghiep"=>strval($this->viTriViecLamSauTotNghiep),
                "chuongTrinhThamKhao"=>strval($this->chuongTrinhThamKhao),
        ];
    }
}