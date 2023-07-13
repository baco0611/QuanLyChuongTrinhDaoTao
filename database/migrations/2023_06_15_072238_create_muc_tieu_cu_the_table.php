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
        Schema::create('MucTieuCuThe', function (Blueprint $table) {
            $table->id('idMucTieu');
            $table->string('kiHieu', 500);
            $table->string('noiDung', 5000);
            $table->string('loaiMucTieu', 500);
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
        Schema::dropIfExists('muc_tieu_cu_the');
    }
};