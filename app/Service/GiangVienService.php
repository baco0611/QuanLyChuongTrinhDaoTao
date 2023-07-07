<?php

namespace App\Service;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use PhpParser\Node\Stmt\Else_;

class GiangVienService
{
    public function check($passwork, $mgv) {
        $user= DB::table('GiangVien')
        ->join('DonVi', 'GiangVien.MaDonVi', '=', 'DonVi.MaDonVi')
        ->where('GiangVien.MaGiangVien', $mgv)
        ->where('GiangVien.MatKhau', $passwork)
        ->get();
        return $user;
    }
    public function getPemission($passwork, $mgv) {
        $user= DB::table('GiangVien')
        ->join('phan_quyen','phan_quyen.MaGiangVien','=', 'GiangVien.MaGiangVien')
        ->where('GiangVien.MaGiangVien', $mgv)
        ->where('GiangVien.MatKhau', $passwork)
        ->get();
        return $user;
    }
    public function getGiangVien ($timkiem) {
        $result =  DB::select('SELECT * FROM func_find_GiangVien(?)', [$timkiem]);
        return $result;
    }

    
}