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
        Schema::create('matran_hocphan_chuandaura', function (Blueprint $table) {
            $table->id('idMaTran');
            $table->foreignId('idChuongTrinhChiTiet');
            $table->foreign('idChuongTrinhChiTiet')->references('idChuongTrinhChiTiet')->on('chuong_trinh_chi_tiet');
            $table->foreignId('idChuanDauRa');
            $table->foreign('idChuanDauRa')->references('idChuanDauRa')->on('chuan_dau_ra');
            $table->integer('mucDoDapUng');
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
        Schema::dropIfExists('matran_hocphan_chuandaura');
    }
};