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
        Schema::create('de_cuong_hoc_phan', function (Blueprint $table) {
            $table->id('idDeCuongHocPhan');
            $table->foreignId('idHocPhan');
            $table->foreign('idHocPhan')->references('idHocPhan')->on('hoc_phan');
            $table->integer('phienBan');
            $table->integer('lyThuyet');
            $table->integer('baiTap');
            $table->integer('thaoLuan');
            $table->integer('thucHanh');
            $table->integer('thucTap');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('de_cuong_hoc_phan');
    }
};