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
        Schema::create('ChuyenNganhDaoTao', function (Blueprint $table) {
            $table->id('idChuyenNganh');
            $table->string('tenChuyenNganh', 500);
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
        Schema::dropIfExists('chuyen_nganh_dao_tao');
    }
};