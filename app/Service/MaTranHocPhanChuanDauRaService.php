<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class MaTranHocPhanChuanDauRaService
{
    public function getList($idCTDT)
    {
        $result= DB::table('MaTran_HocPhan_ChuanDauRa')
        ->select('*')
        ->where('idChuongTrinh', $idCTDT)
        ->get();
        return $result;
    }
    public function delete($val,$idChuongTrinh)  {
        DB::table('MaTran_HocPhan_ChuanDauRa')
        ->where('idMaTran', $val)
        ->where('idChuongTrinh', $idChuongTrinh)
        ->delete();
    }
    public function update($val,$idCTDT)  {
        DB::table('MaTran_HocPhan_ChuanDauRa')
        ->where('idMaTran', $val['id'])
        ->update([
            "mucDoDapUng"=>$val['mucDoDapUng']
        ]);
        $result= DB::table('MaTran_HocPhan_ChuanDauRa')
        ->select('*')
        ->where('idChuongTrinh', $idCTDT)
        ->get();
        return $result;
    }
}