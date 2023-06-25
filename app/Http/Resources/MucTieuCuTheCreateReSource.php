<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class MucTieuCuTheCreateReSource extends JsonResource
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
            'id'=>intval($this->idMucTieu),
            'kiHieu'=>$this->kiHieu,
        ];
    }
}