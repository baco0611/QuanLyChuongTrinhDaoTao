<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MatranChuanDauRaMucTieu extends Model
{
    use HasFactory;
    protected $table = 'MaTran_ChuanDauRa_MucTieu';
    protected $fillable = [
        'idChuanDauRa',
        'idMucTieu',
        'idChuongTrinh'
    ];
}