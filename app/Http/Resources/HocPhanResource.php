<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class HocPhanResource extends JsonResource
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
            "maHocPhan"=>$this->MaHocPhan,
            "tenHocPhan"=> $this->TenHocPhan,
            "idDeCuongHocPhan"=>intval($this->Id)
        ];
    }
}