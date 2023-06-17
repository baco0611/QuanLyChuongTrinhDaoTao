<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChuyenNganhDaoTao extends Model
{
    use HasFactory;
    protected $table = 'chuyen_nganh_dao_tao';
    protected $fillable = [
        'tenChuyenNganh',
        'idChuongTrinh'
    ];
}