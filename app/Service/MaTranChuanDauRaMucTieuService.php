<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class MaTranChuanDauRaMucTieuService
{
    public function getList($idCTDT)
    {
        $result= DB::table('MaTran_ChuanDauRa_MucTieu')
        ->select('*')
        ->where('idChuongTrinh', $idCTDT)
        ->get();
        return $result;
    }
    public function delete($val,$idChuongTrinh)  {
        DB::table('MaTran_ChuanDauRa_MucTieu')
        ->where('idMaTran', $val)
        ->where('idChuongTrinh', $idChuongTrinh)
        ->delete();
    }
}