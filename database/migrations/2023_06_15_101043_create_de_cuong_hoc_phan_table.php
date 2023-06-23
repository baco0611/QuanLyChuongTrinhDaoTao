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
        Schema::create('DeCuongHocPhan', function (Blueprint $table) {
            $table->id('Id');
            $table->integer('PhienBan')->nullable();
            $table->integer('LyThuyet')->nullable();
            $table->integer('BaiTap')->nullable();
            $table->integer('ThaoLuan')->nullable();
            $table->integer('ThucHanh')->nullable();
            $table->integer('ThucTap')->nullable();
            $table->integer('KiemTraGiuaKi')->nullable();
            $table->foreignId('HocPhanId')->nullable();
            $table->foreign('HocPhanId')->references('Id')->on('HocPhan');
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
        Schema::dropIfExists('de_cuong_hoc_phan');
    }
};