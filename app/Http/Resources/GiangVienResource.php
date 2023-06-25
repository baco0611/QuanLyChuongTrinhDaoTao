<?php

namespace App\Http\Resources;

use App\Service\GiangVienService;
use Illuminate\Http\Resources\Json\JsonResource;

class GiangVienResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $giangVien = new GiangVienService();
        $quyen = $giangVien->getPemission($this->MatKhau, $this->MaGiangVien);
        $hoTen= $this->HoDem . " ". $this->Ten;
        return  [
            'HoTen' => $hoTen,
            'TenDonVi' => $this->TenDonVi,
            'Quyen' => QuyenResource::collection($quyen)
        ];
    }
}