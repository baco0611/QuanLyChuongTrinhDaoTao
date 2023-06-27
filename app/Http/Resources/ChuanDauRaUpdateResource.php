<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ChuanDauRaUpdateResource extends JsonResource
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
            'id'=>intval($this->idChuanDauRa),
            'kiHieu'=>$this->kiHieu,
            'noiDung'=>$this->noiDung,
            'loaiChuanDauRa'=>$this->loaiChuanDauRa,
            'loaiChuanDauRaChiTiet'=>$this->loaiChuanDauRaChiTiet,
            'trinhDoNangLuc'=>intval($this->trinhDoNangLuc),
            'idCTDT'=>$this->idChuongTrinh
        ];
    }
}