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
        Schema::create('MaTran_ChungChi_ChuanDauRa', function (Blueprint $table) {
            $table->id('idMaTran');
            $table->foreignId('idChungChi');
            $table->foreign('idChungChi')->references('idChungChi')->on('DanhMucChungChiDieuKien');
            $table->foreignId('idChuanDauRa');
            $table->foreign('idChuanDauRa')->references('idChuanDauRa')->on('ChuanDauRa');
            $table->integer('trinhDoNangLuc');
            $table->foreignId('idChuongTrinh');
            $table->foreign('idChuongTrinh')->references('idChuongTrinh')->on('ChuongTrinhDaoTao');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('matran_chungchi_chuandaura');
    }
};