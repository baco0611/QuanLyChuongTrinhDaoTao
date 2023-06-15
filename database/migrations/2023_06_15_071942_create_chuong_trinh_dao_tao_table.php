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
            $table->string('phienBan', 500);
            $table->string('tenTiengViet', 500);
            $table->string('tenTiengAnh', 500);
            $table->string('tringDoDaoTao', 500);
            $table->string('maNganhDaoTao', 500);
            $table->string('tenNganhDaoTao', 500);
            $table->string('khoaQuanLyChuongTrinh', 500);
            $table->string('doiTuongTuyenSinh', 500);
            $table->integer('thoiGianDaoTao');
            $table->string('loaiHinhDaoTao', 500);
            $table->integer('soTinChiYeuCauTichLuy');
            $table->string('dieuKienTotNghiep', 500);
            $table->string('vanBangTotNghiep', 500);
            $table->string('viTriViecLamSauTotNghiep', 500);
            $table->string('khaNangNangCaoTrinhhDo', 500);
            $table->string('chuongTrinhThamKhao', 500);
            $table->string('mucTieuTongQuat', 500);
            $table->string('nguoiTao', 500);
            $table->dateTime('ngayTao');
            $table->dateTime('ngayThayDoi');
            $table->integer('buocHienTai');
            $table->string('trangThai');
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