<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class CreditsResource extends JsonResource
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
            "khoiDaiCuong"=>intval($this->khoiDaiCuong),
            "khoiCoSoNganh"=>intval($this->khoiCoSoNganh),
            "khoiNganh"=>intval($this->khoiNganh),
            "khoiBotro"=>intval($this->khoiBoTro),
            "khoiThucTap"=>intval($this->khoiThucTap),
            "khoiDoAnKhoaLuan"=>intval($this->khoiDoAnKhoaLuan),
            "khoiChuyenNganh"=>intval($this->khoiChuyenNganh)
        ];
    }
}