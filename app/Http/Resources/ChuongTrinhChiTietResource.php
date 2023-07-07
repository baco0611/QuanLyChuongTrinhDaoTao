<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChuongTrinhChiTietResource extends JsonResource
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
            "id"=>intval($this->idChuongTrinhChiTiet),
            "idDeCuongHocPhan"=>intval($this->DeCuongHocPhanId),
            "thayTheKhoaLuan"=>boolval($this->thayThe),
            "maHocPhan"=>$this->MaHocPhan,
            "tenHocPhan"=>$this->TenHocPhan,
            "batBuoc"=>boolval($this->batBuoc),
            "soTinChi"=>intval($this->SoTinChi),
            "lyThuyet"=>intval($this->LyThuyet),
            "baiTap"=>intval($this->BaiTap),
            "thaoLuan"=>intval($this->ThaoLuan),
            "thucHanh"=>intval($this->ThucHanh),
            "thucTap"=>intval($this->ThucTap),
            "kiemTra"=>intval($this->KiemTraGiuaKi),
            "tienQuyet"=>json_decode($this->tienQuyet),
            "hocTruoc"=> json_decode($this->hocTruoc),
            "songHanh"=> json_decode($this->songHanh),
            "hocKy"=>intval($this->hocKy),
            "khoiKienThuc"=>$this->khoiKienThuc,
            "chiTietKhoiKienThuc"=>$this->chiTietKhoiKienThuc,
            "idChuyenNganh"=>intval($this->idChuyenNganh),
            "tenChuyenNganh"=>$this->tenChuyenNganh
        ];
    }
}