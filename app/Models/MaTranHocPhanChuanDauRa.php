<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MaTranHocPhanChuanDauRa extends Model
{
    use HasFactory;
    protected $table = 'MaTran_HocPhan_ChuanDauRa';
    protected $fillable = [
        'idChuanDauRa',
        'idChuongTrinhChiTiet',
        'mucDoDapUng',
        'idChuongTrinh'
    ];
}