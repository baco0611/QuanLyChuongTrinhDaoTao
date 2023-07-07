<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;


class ChuanDauRaService 
{
    public function getList($idChuongTrinh) {
        $result = DB::table('ChuanDauRa')
        ->where('idChuongTrinh', $idChuongTrinh)
        ->get();
        return $result;
    }
    public function update($val)  {
        DB::table('ChuanDauRa')
        ->where('idChuanDauRa', $val['id'])
        ->where('idChuongTrinh', $val['idCTDT'])
        ->update([
            "kiHieu"=>$val['kiHieu'],
            "noiDung"=>$val['noiDung'],
            "loaiChuanDauRa"=>$val['loaiChuanDauRa'],
            "loaiChuanDauRaChiTiet"=>$val['loaiChuanDauRaChiTiet'],
            "trinhDoNangLuc"=>$val['trinhDoNangLuc']
        ]);
    }
    public function delete($val)  {
        DB::table('MaTran_ChuanDauRa_MucTieu')
        ->where('idChuanDauRa', $val['id'])
        ->delete();
        DB::table('ChuanDauRa')
        ->where('idChuanDauRa', $val['id'])
        ->where('idChuongTrinh', $val['idCTDT'])
        ->delete();
    }
}