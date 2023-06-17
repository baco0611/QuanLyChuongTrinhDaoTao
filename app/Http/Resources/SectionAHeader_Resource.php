<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class SectionAHeader_Resource extends JsonResource
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
            "tenNganhDaoTao"=>strval($this->tenNganhDaoTao),
            "maChuongTrinhDaoTao" =>strval($this->maChuongTrinhDaoTao),
            "phienBan" =>strval($this->phienBan)
        ];
    }
}