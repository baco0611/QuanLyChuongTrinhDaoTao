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
        Schema::create('chuong_trinh_chi_tiet', function (Blueprint $table) {
            $table->id('idChuongTrinhChiTiet');
            $table->foreignId('idDeCuongHocPhan');
            $table->foreign('idDeCuongHocPhan')->references('idDeCuongHocPhan')->on('de_cuong_hoc_phan');
            $table->boolean('batBuoc');
            $table->boolean('thayThe');
            $table->string('tienQuyet', 50);
            $table->string('hocTruoc', 50);
            $table->string('songHanh', 50);
            $table->integer('hocKy');
            $table->string('khoiKienThuc', 500);
            $table->string('chiTietKhoiKienThuc', 500);
            $table->timestamps();
            $table->foreignId('idChuyenNganh');
            $table->foreign('idChuyenNganh')->references('idChuyenNganh')->on('chuyen_nganh_dao_tao');
            $table->foreignId('idChuongTrinh');
            $table->foreign('idChuongTrinh')->references('idChuongTrinh')->on('chuong_trinh_dao_tao');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chuong_trinh_chi_tiet');
    }
};