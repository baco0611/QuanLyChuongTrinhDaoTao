<?php

namespace App\Service;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ChuongTrinhDaoTaoService
{
   public function getList () 
   {
    $result= DB::table('chuong_trinh_dao_tao')
        ->select('maChuongTrinhDaoTao', 'tenTiengViet AS tenChuongTrinhDaoTao', 'tenNganhDaoTao', 
        'trangThai','idChuongTrinh AS id', DB::raw('ROW_NUMBER() OVER(ORDER BY idChuongTrinh) AS stt'),
        'nguoiTao',DB::raw('Convert(varchar,created_at,103) AS created_at'), 
        DB::raw('Convert(varchar,updated_at,103) AS updated_at'))
        ->paginate(20);
        return $result;
   }

   public function updateCTDT (Request $request) 
   {
     DB::table('chuong_trinh_dao_tao')
        ->where('idChuongTrinh', $request['id'])
        ->update([
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
        ]);
        $result= DB::table('chuong_trinh_dao_tao')
        ->where('idChuongTrinh', $request['id'])
        ->get();

        return $result;
   }
   public function getCTDT ($id) 
   {
    $result= DB::table('chuong_trinh_dao_tao')
    ->where('idChuongTrinh', $id)
    ->get();
    return $result;
   }
}