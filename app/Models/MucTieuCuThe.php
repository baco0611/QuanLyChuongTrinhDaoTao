<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MucTieuCuThe extends Model
{
    use HasFactory;
    protected $table = 'MucTieuCuThe';
    protected $fillable = [
        'kiHieu', 'noiDung', 'loaiMucTieu', 'idChuongTrinh'
    ];   
}