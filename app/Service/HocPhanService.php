<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class HocPhanService
{
    public function getHocPhanForMaHocPhan ($key) {
        $result =  DB::select('SELECT * FROM func_find_HocPhan_MaHocPhan(?)', [$key]);
        return $result;
    }

    public function getHocPhanForTenHocPhan ($key) {
        $result =  DB::select('SELECT * FROM func_find_HocPhan_TenHocPhan(?)', [$key]);
        return $result;
    }
    public function getHocPhanForMaHocPhanById ($key,$idCTDT) {
        $result =  DB::select('SELECT * FROM func_find_HocPhan_MaHocPhan_IdChuongTrinh(?,?)', [$key,$idCTDT]);
        return $result;
    }

    public function getHocPhanForTenHocPhanById ($key,$idCTDT) {
        $result =  DB::select('SELECT * FROM func_find_HocPhan_TenHocPhan_IdChuongTrinh(?,?)', [$key,$idCTDT]);
        return $result;
    }

}