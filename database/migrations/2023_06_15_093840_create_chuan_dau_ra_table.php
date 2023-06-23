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
        Schema::create('ChuanDauRa', function (Blueprint $table) {
            $table->id('idChuanDauRa');
            $table->string('kiHieu', 500);
            $table->text('noiDung');
            $table->string('loaiChuanDauRa', 500);
            $table->string('loaiChuanDauRaChiTiet', 500);
            $table->integer('trinhDoNangLuc');
            $table->timestamps();
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
        Schema::dropIfExists('chuan_dau_ra');
    }
};