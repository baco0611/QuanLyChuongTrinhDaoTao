<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChuanDauRa extends Model
{
    use HasFactory;
    protected $table = 'ChuanDauRa';
    protected $fillable = [
        'kiHieu', 'noiDung', 'loaiChuanDauRa', 'loaiChuanDauRaChiTiet',
        'trinhDoNangLuc', 'idChuongTrinh'
    ];   
}