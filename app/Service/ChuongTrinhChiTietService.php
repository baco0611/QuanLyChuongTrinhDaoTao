<?php

namespace App\Service;

use Illuminate\Support\Facades\DB;


class ChuongTrinhChiTietService
{
    public function getList($idCTDT)
    {
        $result= DB::table('ChuongTrinhChiTiet')
        ->select("idChuongTrinhChiTiet","DeCuongHocPhanId","thayThe",
        "MaHocPhan","TenHocPhan","batBuoc","SoTinChi","LyThuyet","BaiTap",
        "ThaoLuan","ThucHanh","ThucTap","KiemTraGiuaKi","tienQuyet","hocTruoc",
        "songHanh","hocKy","khoiKienThuc","chiTietKhoiKienThuc","ChuongTrinhChiTiet.idChuyenNganh",
        "tenChuyenNganh","stt")
        ->join('DeCuongHocPhan as dc','dc.Id','=', 'ChuongTrinhChiTiet.DeCuongHocPhanId')
        ->join('HocPhan as hp','hp.Id','=', 'dc.HocPhanId')
        ->leftJoin('ChuyenNganhDaoTao as cn','ChuongTrinhChiTiet.idChuyenNganh','=', 'cn.idChuyenNganh')
        ->where('ChuongTrinhChiTiet.idChuongTrinh', $idCTDT)
        ->get();
        //dd($result);
        return $result;
    }
    public function update($val)  {
        DB::table('ChuongTrinhChiTiet')
        ->where('idChuongTrinhChiTiet', $val['id'])
        ->update([
            "DeCuongHocPhanID"=>$val['idDeCuongHocPhan'],
            "thayThe"=>$val['thayTheKhoaLuan'],
            "batBuoc"=>$val['batBuoc'],
            "tienQuyet"=>json_encode($val['tienQuyet']),
            "hocTruoc"=>json_encode($val['hocTruoc']),
            "songHanh"=>json_encode($val['songHanh']),
            "hocKy"=>$val['hocKy'],
            "khoiKienThuc"=>$val['khoiKienThuc'],
            "chiTietKhoiKienThuc"=>$val['chiTietKhoiKienThuc'],
            "idChuyenNganh"=>$val['idChuyenNganh']
        ]);
    }
    public function delete($val)  {
        DB::table('ChuongTrinhChiTiet')
        ->where('idChuongTrinhChiTiet', $val)
        ->delete();
    }
    public function checkMaHocPhan ($arr)
    {
        foreach ($arr as $mahp)
        {
        $result=DB::table('HocPhan')
        ->where('MahocPhan', $mahp)
        ->get();
        if (empty(json_decode($result)))
        {
            return false;
        }
        }
        return true;
    }
}