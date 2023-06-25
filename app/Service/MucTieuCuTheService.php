<?php

namespace App\Service;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\Else_;

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
        ->update([
            "kiHieu"=>$val['kiHieu'],
            "noiDung"=>$val['noiDung'],
            "loaiMucTieu"=>$val['loaiMucTieu'],
        ]);
    }
    public function delete($val)  {
        DB::table('MucTieuCuThe')
        ->where('idMucTieu', $val['id'])
        ->delete();
    }
}