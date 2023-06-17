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

#ChuongTrinhDaoTao SectionA
Route::post('update_sectionA', [ChuongTrinhDaoTaoController::class,'store'])->name('ctdt.store');
Route::get('mainList', [ChuongTrinhDaoTaoController::class, 'index'])->name('ctdt.index');
Route::get('sectionA/{id}', [ChuongTrinhDaoTaoController::class, 'showCTDT'])->name('ctdt.showCTDT');
Route::get('sectionHeader/{id}', [ChuongTrinhDaoTaoController::class, 'showHeader'])->name('ctdt.showHeader');
Route::post('insertCTDT', [ChuongTrinhDaoTaoController::class,'storeCTDT'])->name('insertCtdt.storeCTDT');
#mucTieuTongQuat SectionB
Route::post('update_sectionB', [ChuongTrinhDaoTaoController::class,'storeMTTQ'])->name('insertCtdt.storeMTTQ');
Route::get('sectionB/{id}', [ChuongTrinhDaoTaoController::class, 'showMTTQ'])->name('ctdt.showMTTQ');
#ChuyenNganhDaoTao
Route::post('chuyenNganhDaoTao', [ChuyenNganhDaoTaoController::class,'store'])->name('cndt.store');