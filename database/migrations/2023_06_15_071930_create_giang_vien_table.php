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
        Schema::create('GiangVien', function (Blueprint $table) {
            $table->string('MaGiangVien', 50)->primary();
            $table->string('HoDem', 500);
            $table->string('Ten', 50);
            $table->boolean('GioiTinh')->nullable();
            $table->string('Email', 500)->nullable();
            $table->string('MaDonVi', 50);
            $table->foreign('MaDonVi')->references('MaDonVi')->on('DonVi');
            $table->string('MatKhau', 500);
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
        Schema::dropIfExists('giang_vien');
    }
};