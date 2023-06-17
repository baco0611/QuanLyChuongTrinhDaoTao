<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChuongTrinhDaoTao extends Model
{
    use HasFactory;
    protected $table = 'chuong_trinh_dao_tao';
    protected $fillable = [
        'tenTiengViet', 'tenTiengAnh', 'trinhDoDaoTao', 'maNganhDaoTao',
         'tenNganhDaoTao', 'khoaQuanLyChuongTrinh', 'doiTuongTuyenSinh',
        'thoiGianDaoTao', 'loaiHinhDaoTao', 'soTinChiYeuCauTichLuy', 'dieuKienTotNghiep', 
        'vanBangTotNghiep', 'viTriViecLamSauTotNghiep', 'khaNangNangCaoTrinhDo',
        'chuongTrinhThamKhao', 'maChuongTrinhDaoTao', 'trangThai'
    ];

}