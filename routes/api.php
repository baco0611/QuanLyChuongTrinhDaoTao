<?php

use App\Http\Controllers\Api\ChuongTrinhDaoTaoController;
use App\Http\Controllers\Api\ChuyenNganhDaoTaoController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

#ChuongTrinhDaoTao
Route::post('update_chuongTrinhDaoTao', [ChuongTrinhDaoTaoController::class,'store'])->name('ctdt.store');
Route::get('mainList', [ChuongTrinhDaoTaoController::class, 'index'])->name('ctdt.index');
Route::get('sectionA/{id}', [ChuongTrinhDaoTaoController::class, 'show1'])->name('ctdt.show1');
Route::get('sectionHeader/{id}', [ChuongTrinhDaoTaoController::class, 'show2'])->name('ctdt.show2');
Route::post('insertCTDT', [ChuongTrinhDaoTaoController::class,'store'])->name('insertCtdt.store');

#ChuyenNganhDaoTao
Route::post('chuyenNganhDaoTao', [ChuyenNganhDaoTaoController::class,'store'])->name('cndt.store');