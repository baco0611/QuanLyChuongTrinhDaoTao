<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;

class ChuyenNganhDaoTaoService
{
    public function getCNDT($idCTDT)
    {
        $result= DB::table('ChuyenNganhDaoTao')
        ->select('*')
        ->where('idChuongTrinh', $idCTDT)
        ->get();
        return $result;
    }
    public function update($val,$idCTDT)  {
        DB::table('ChuyenNganhDaoTao')
        ->where('idChuyenNganh', $val['id'])
        ->where('idChuongTrinh', $idCTDT)
        ->update([
            "tenChuyenNganh"=>$val['tenChuyenNganh']
        ]);
    }
    public function delete($val,$idChuongTrinh)  {
        DB::table('ChuyenNganhDaoTao')
        ->where('idChuyenNganh', $val)
        ->where('idChuongTrinh', $idChuongTrinh)
        ->delete();
    }
}