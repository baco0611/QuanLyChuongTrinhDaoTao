<?php

namespace App\Service;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChuongTrinhDaoTaoService
{
   public function getList () 
   {
    $result= DB::table('ChuongTrinhDaoTao')
        ->select('maChuongTrinhDaoTao', 'tenTiengViet AS tenChuongTrinhDaoTao', 'tenNganhDaoTao', 
        'trangThai','idChuongTrinh AS id', "stt",
        'nguoiPhuTrach',DB::raw('Convert(varchar,ChuongTrinhDaoTao.created_at,103) AS created_at'), 
        DB::raw('Convert(varchar,ChuongTrinhDaoTao.updated_at,103) AS updated_at'), 'HoDem', 'Ten')
        ->join('GiangVien','GiangVien.MaGiangVien','=', 'ChuongTrinhDaoTao.nguoiPhuTrach')
        ->paginate(20);
        return $result;
   }

   public function updateCTDT (Request $request) 
   {
     DB::table('ChuongTrinhDaoTao')
        ->where('idChuongTrinh', $request['id'])
        ->update([
            // "phienBan"=>$request['phienBan'],
            "tenTiengViet"=>$request['tenTiengViet'],
            "tenTiengAnh" =>$request['tenTiengAnh'],
            "trinhDoDaoTao"=>$request['trinhDoDaoTao'],
            "maNganhDaoTao"=>$request['maNganhDaoTao'],
            "tenNganhDaoTao"=>$request['tenNganhDaoTao'],
            "khoaQuanLyChuongTrinh"=>$request['khoaQuanLyChuongTrinh'],
            "doiTuongTuyenSinh"=>$request['doiTuongTuyenSinh'],
            "thoiGianDaoTao"=>$request['thoiGianDaoTao'],
            "loaiHinhDaoTao"=>$request['loaiHinhDaoTao'],
            "soTinChiYeuCauTichLuy"=>$request['soTinChiYeuCauTichLuy'],
            "dieuKienTotNghiep"=>$request['dieuKienTotNghiep'],
            "vanBangTotNghiep"=>$request['vanBangTotNghiep'],
            "khaNangNangCaoTrinhDo"=>$request['khaNangNangCaoTrinhDo'],
            "viTriViecLamSauTotNghiep"=>$request['viTriViecLamSauTotNghiep'],
            "chuongTrinhThamKhao"=>$request['chuongTrinhThamKhao'],
            // "mucTieuTongQuat" =>$request['mucTieuTongQuat'],
            "trangThai" =>$request['trangThai']
        ]);
        $result= DB::table('ChuongTrinhDaoTao')
        ->where('idChuongTrinh', $request['id'])
        ->get();

        return $result;
   }
   public function updateMTTQ (Request $request) 
   {
     DB::table('ChuongTrinhDaoTao')
        ->where('idChuongTrinh', $request['id'])
        ->update([
            "mucTieuTongQuat" => $request['mucTieuTongQuat']
        ]);
        $result= DB::table('ChuongTrinhDaoTao')
        ->where('idChuongTrinh', $request['id'])
        ->get();
        return $result;
   }
   public function getCTDT ($id) 
   {
    $result= DB::table('ChuongTrinhDaoTao')
    ->where('idChuongTrinh', $id)
    ->get();
    return $result;
   }
   public function updateCredits ( $val,$idCTDT) 
   {
     DB::table('ChuongTrinhDaoTao')
        ->where('idChuongTrinh', $idCTDT)
        ->update([
            "khoiDaiCuong"=>$val['khoiDaiCuong'],
            "khoiCoSoNganh"=>$val['khoiCoSoNganh'],
            "khoiNganh"=>$val['khoiNganh'],
            "khoiBoTro"=>$val['khoiBoTro'],
            "khoiThucTap"=>$val['khoiThucTap'],
            "khoiDoAnKhoaLuan"=>$val['khoiDoAnKhoaLuan'],
            "khoiChuyenNganh"=>$val['khoiChuyenNganh']
        ]);
        $result= DB::table('ChuongTrinhDaoTao')
        ->where('idChuongTrinh', $idCTDT)
        ->get();

        return $result;
   }
}