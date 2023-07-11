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
        Schema::create('ChuongTrinhChiTiet', function (Blueprint $table) {
            $table->id('idChuongTrinhChiTiet');
            $table->foreignId('DeCuongHocPhanId');
            $table->foreign('DeCuongHocPhanId')->references('Id')->on('DeCuongHocPhan');
            $table->boolean('batBuoc');
            $table->boolean('thayThe');
            $table->string('tienQuyet', 500);
            $table->string('hocTruoc', 500);
            $table->string('songHanh', 500);
            $table->integer('hocKy');
            $table->string('khoiKienThuc', 500);
            $table->string('chiTietKhoiKienThuc', 500)->nullable();
            $table->timestamps();
            $table->foreignId('idChuyenNganh')->nullable();
            $table->foreign('idChuyenNganh')->references('idChuyenNganh')->on('ChuyenNganhDaoTao');
            $table->foreignId('idChuongTrinh');
            $table->foreign('idChuongTrinh')->references('idChuongTrinh')->on('ChuongTrinhDaoTao');
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