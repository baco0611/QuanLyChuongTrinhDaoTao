<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;


class MucTieuCuTheService 
{
    public function getList($idChuongTrinh) {
        $result = DB::table('MucTieuCuThe')
        ->where('idChuongTrinh', $idChuongTrinh)
        ->get();
        return $result;
    }
    public function update($val)  {
        DB::table('MucTieuCuThe')
        ->where('idMucTieu', $val['id'])
        ->where('idChuongTrinh', $val['idCTDT'])
        ->update([
            "kiHieu"=>$val['kiHieu'],
            "noiDung"=>$val['noiDung'],
            "loaiMucTieu"=>$val['loaiMucTieu'],
        ]);
    }
    public function delete($val)  {
        DB::table('MaTran_ChuanDauRa_MucTieu')
        ->where('idMucTieu', $val['id'])
        ->delete();
        DB::table('MucTieuCuThe')
        ->where('idMucTieu', $val['id'])
        ->where('idChuongTrinh', $val['idCTDT'])
        ->delete();
    }
}