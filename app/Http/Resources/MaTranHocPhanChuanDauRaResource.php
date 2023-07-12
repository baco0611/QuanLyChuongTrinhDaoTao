<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MaTranHocPhanChuanDauRaResource extends JsonResource
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
            "id"=> intval($this->idMaTran),
            "PLO"=>intval($this->idChuanDauRa),
            "idCTCT"=>intval($this->idChuongTrinhChiTiet),
            "mucDoDapUng"=>intval($this->mucDoDapUng)
        ];
    }
}