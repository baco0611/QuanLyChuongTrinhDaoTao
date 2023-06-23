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
        Schema::create('MaTran_HocPhan_ChuanDauRa', function (Blueprint $table) {
            $table->id('idMaTran');
            $table->timestamps();
            $table->foreignId('idChuongTrinhChiTiet');
            $table->foreign('idChuongTrinhChiTiet')->references('idChuongTrinhChiTiet')->on('ChuongTrinhChiTiet');
            $table->foreignId('idChuanDauRa');
            $table->foreign('idChuanDauRa')->references('idChuanDauRa')->on('ChuanDauRa');
            $table->integer('mucDoDapUng');
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
        Schema::dropIfExists('matran_hocphan_chuandaura');
    }
};