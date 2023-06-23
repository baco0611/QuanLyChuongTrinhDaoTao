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
        Schema::create('MaTran_ChuanDauRa_MucTieu', function (Blueprint $table) {
            $table->id('idMaTran');
            $table->timestamps();
            $table->foreignId('idChuanDauRa');
            $table->foreign('idChuanDauRa')->references('idChuanDauRa')->on('ChuanDauRa');
            $table->foreignId('idMucTieu');
            $table->foreign('idMucTieu')->references('idMucTieu')->on('MucTieuCuThe');
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
        Schema::dropIfExists('matran_chuandaura_muctieu');
    }
};