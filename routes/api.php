<?php

use App\Http\Controllers\Api\ChuongTrinhDaoTaoController;
use App\Http\Controllers\Api\ChuyenNganhDaoTaoController;
use App\Http\Controllers\Api\GiangVienController;
use App\Http\Controllers\Api\LoginController;
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
Route::post('createCNDT_sectionA', [ChuyenNganhDaoTaoController::class,'store'])->name('cndt.store');
Route::get('sectionA_ChuyenNganh', [ChuyenNganhDaoTaoController::class, 'show'])->name('cndt.index'); //chua lam
#MucTieuCuThe SectionC 
Route::post('create_sectionC', [MucTieuCuTheController::class, 'storeCreate'])->name('createMTCT.storeCreate');
Route::post('update_sectionC', [MucTieuCuTheController::class, 'storeUpdate'])->name('updateMTCT.storeUpdate');
Route::delete('delete_sectionC', [MucTieuCuTheController::class, 'destroy'])->name('deleteMTCT.destroy');
Route::get('sectionC/{id}', [MucTieuCuTheController::class, 'show'])->name('ctdt.show');