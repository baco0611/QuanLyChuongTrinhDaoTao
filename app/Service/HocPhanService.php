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

}