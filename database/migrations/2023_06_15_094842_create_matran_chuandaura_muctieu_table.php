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
        Schema::create('matran_chuandaura_muctieu', function (Blueprint $table) {
            $table->id('idMaTran');
            $table->timestamps();
            $table->foreignId('idChuanDauRa');
            $table->foreign('idChuanDauRa')->references('idChuanDauRa')->on('chuan_dau_ra');
            $table->foreignId('idMucTieu');
            $table->foreign('idMucTieu')->references('idMucTieu')->on('muc_tieu_cu_the');
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
        Schema::dropIfExists('matran_chuandaura_muctieu');
    }
};