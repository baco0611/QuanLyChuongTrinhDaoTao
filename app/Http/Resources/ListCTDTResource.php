<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class ListCTDTResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $hoTen =$this->HoDem ." ". $this->Ten;
        return[
            'maChuongTrinhDaoTao'=>strval($this->maChuongTrinhDaoTao),
            'tenChuongTrinhDaoTao'=>strval($this->tenChuongTrinhDaoTao),
            'tenNganhDaoTao'=>strval($this->tenNganhDaoTao),
            'trangThai'=>strval($this->trangThai),
            'id'=>$this->id,
            'stt'=>$this->stt,
            'nguoiPhuTrach'=> $hoTen ,
            'created_at'=>$this->created_at,
            'updated_at'=>$this->updated_at
        ];
    }
}