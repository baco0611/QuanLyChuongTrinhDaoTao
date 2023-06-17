<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chuong_trinh_dao_tao', function (Blueprint $table) {
            $table->id('idChuongTrinh');
            $table->string('maChuongTrinhDaoTao', 500)->unique();
            $table->string('phienBan', 500)->nullable();
            $table->string('tenTiengViet', 500)->nullable();
            $table->string('tenTiengAnh', 500)->nullable();
            $table->string('trinhDoDaoTao', 500)->nullable();
            $table->string('maNganhDaoTao', 500)->nullable();
            $table->string('tenNganhDaoTao', 500)->nullable();
            $table->string('khoaQuanLyChuongTrinh', 500)->nullable();
            $table->string('doiTuongTuyenSinh', 500)->nullable();
            $table->integer('thoiGianDaoTao')->nullable();
            $table->string('loaiHinhDaoTao', 500)->nullable();
            $table->integer('soTinChiYeuCauTichLuy')->nullable();
            $table->string('dieuKienTotNghiep', 500)->nullable();
            $table->string('vanBangTotNghiep', 500)->nullable();
            $table->string('viTriViecLamSauTotNghiep', 500)->nullable();
            $table->string('khaNangNangCaoTrinhDo', 500)->nullable();
            $table->string('chuongTrinhThamKhao', 500)->nullable();
            $table->string('mucTieuTongQuat', 500)->nullable();
            $table->string('nguoiTao', 500)->nullable();
            $table->timestamps();
            $table->integer('buocHienTai')->nullable();
            $table->string('trangThai')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chuong_trinh_dao_tao');
    }
};