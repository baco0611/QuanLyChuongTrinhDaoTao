<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class ChuyenNganhDaoTaoService
{
    public function getIdChuongTrinh($maChuongTrinhDaoTao)
    {
        $result= DB::table('ChuongTrinhDaoTao')
        ->select('*')
        ->where('maChuongTrinhDaoTao', $maChuongTrinhDaoTao)
        ->get();
        return $result;
    }
   
}