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
        Schema::create('chuongtrinhchitet_chungchidieukien', function (Blueprint $table) {
            $table->foreignId('idChuongTrinh');
            $table->foreign('idChuongTrinh')->references('idChuongTrinh')->on('chuong_trinh_dao_tao');
            $table->foreignId('idChungChi');
            $table->foreign('idChungChi')->references('idChungChi')->on('danh_muc_chung_chi_dieu_kien');
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