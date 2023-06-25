<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ChuyenNganhDaoTao extends Model
{
    use HasFactory;
    protected $table = 'ChuyenNganhDaoTao';
    protected $fillable = [
        'tenChuyenNganh',
        'idChuongTrinh'
    ];
}