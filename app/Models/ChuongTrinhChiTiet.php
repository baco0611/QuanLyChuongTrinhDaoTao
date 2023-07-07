<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChuongTrinhChiTiet extends Model
{
    use HasFactory;
    protected $table = 'ChuongTrinhChiTiet';
    protected $fillable = [
        'DeCuongHocPhanId', 'batBuoc','thayThe','tienQuyet','hocTruoc',
        'songHanh','hocKy','khoiKienThuc','chiTietKhoiKienThuc'
    ];
}