<?php

use App\Http\Controllers\Api\ChuanDauRaController;
use App\Http\Controllers\Api\ChuongTrinhDaoTaoController;
use App\Http\Controllers\Api\ChuyenNganhDaoTaoController;
use App\Http\Controllers\Api\GiangVienController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\MaTranChuanDauRaMucTieuController;
use App\Http\Controllers\Api\MucTieuCuTheController;
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


#login
Route::post('user', [LoginController::class,'store'])->name('user.store');//viet api nay de tao mk md5 trong db
Route::post('login', [LoginController::class,'login'])->name('check.login');
#ChuongTrinhDaoTao SectionA
Route::post('update_sectionA', [ChuongTrinhDaoTaoController::class,'storeUpdate'])->name('update.store');
Route::get('mainList', [ChuongTrinhDaoTaoController::class, 'index'])->name('ctdt.index');
Route::get('sectionA/{id}', [ChuongTrinhDaoTaoController::class, 'showCTDT'])->name('ctdt.showCTDT');
Route::get('sectionHeader/{id}', [ChuongTrinhDaoTaoController::class, 'showHeader'])->name('ctdt.showHeader');
Route::post('create_sectionA', [ChuongTrinhDaoTaoController::class,'storeCreate'])->name('create.storeCTDT');
#GiangVien
Route::post('find_GiangVien', [GiangVienController::class,'storeFind'])->name('find.showFind');
#MucTieuTongQuat SectionB
Route::post('update_sectionB', [ChuongTrinhDaoTaoController::class,'storeMTTQ'])->name('insertCtdt.storeMTTQ');
Route::get('sectionB/{id}', [ChuongTrinhDaoTaoController::class, 'showMTTQ'])->name('ctdt.showMTTQ');
#ChuyenNganhDaoTao 
Route::post('create_ChuyenNganhDaoTao', [ChuyenNganhDaoTaoController::class,'storeCreate'])->name('cndt.storeCreate');
Route::post('update_ChuyenNganhDaoTao', [ChuyenNganhDaoTaoController::class,'storeUpdate'])->name('cndt.storeUpdate');
Route::delete('delete_ChuyenNganhDaoTao', [ChuyenNganhDaoTaoController::class, 'destroy'])->name('cndt.destroy');
Route::get('ChuyenNganhDaoTao/{id}', [ChuyenNganhDaoTaoController::class, 'show'])->name('cndt.index'); 
#MucTieuCuThe SectionC 
Route::post('create_sectionC', [MucTieuCuTheController::class, 'storeCreate'])->name('createMTCT.storeCreate');
Route::post('update_sectionC', [MucTieuCuTheController::class, 'storeUpdate'])->name('updateMTCT.storeUpdate');
Route::delete('delete_sectionC', [MucTieuCuTheController::class, 'destroy'])->name('deleteMTCT.destroy');
Route::get('sectionC/{id}', [MucTieuCuTheController::class, 'show'])->name('MTCT.show');
#ChuanDauRa SectionD 
Route::post('create_sectionD', [ChuanDauRaController::class, 'storeCreate'])->name('createCDR.storeCreate');
Route::post('update_sectionD', [ChuanDauRaController::class, 'storeUpdate'])->name('updateCDR.storeUpdate');
Route::delete('delete_sectionD', [ChuanDauRaController::class, 'destroy'])->name('deleteCDR.destroy');
Route::get('sectionD/{id}', [ChuanDauRaController::class, 'show'])->name('CDR.show');
#MaTran ChuanDauRa_MucTieu SectionE 
Route::post('create_sectionE', [MaTranChuanDauRaMucTieuController::class, 'storeCreate'])
                                                ->name('createMatran_MT_CDR.storeCreate');
Route::delete('delete_sectionE', [MaTranChuanDauRaMucTieuController::class, 'destroy'])
                                                ->name('deleteMaTran_MT_CDT.destroy');
Route::get('sectionE/{id}', [MaTranChuanDauRaMucTieuController::class, 'show'])->name('MaTran.show');