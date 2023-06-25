<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class GiangVien extends Model
{
    use HasFactory;
    protected $table = 'GiangVien';
    protected $fillable = [
        'MaGiangVien', 'HoDem', 'Ten', 'GioiTinh',
        'Email', 'MaDonVi', 'MatKhau'
    ];   
}