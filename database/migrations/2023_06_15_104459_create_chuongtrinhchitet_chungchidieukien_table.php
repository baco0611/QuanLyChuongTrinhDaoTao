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
        Schema::create('ChuongTrinhChiTiet_ChungChiDieuKien', function (Blueprint $table) {
            $table->timestamps();
            $table->foreignId('idChuongTrinh');
            $table->foreign('idChuongTrinh')->references('idChuongTrinh')->on('ChuongTrinhDaoTao');
            $table->foreignId('idChungChi');
            $table->foreign('idChungChi')->references('idChungChi')->on('DanhMucChungChiDieuKien');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('chuongtrinhchitet_chungchidieukien');
    }
};