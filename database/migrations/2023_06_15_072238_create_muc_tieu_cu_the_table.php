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
        Schema::create('muc_tieu_cu_the', function (Blueprint $table) {
            $table->id('idMucTieu');
            $table->string('kiHieu', 500);
            $table->string('noiDung', 500);
            $table->string('loaiMucTieu', 500);
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
        Schema::dropIfExists('muc_tieu_cu_the');
    }
};