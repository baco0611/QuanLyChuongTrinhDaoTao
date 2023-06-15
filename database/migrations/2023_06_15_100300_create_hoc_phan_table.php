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
        Schema::create('hoc_phan', function (Blueprint $table) {
            $table->id('idHocPhan');
            $table->string('tenHocPhan', 500);
            $table->string('tenTiengAnh', 500);
            $table->string('maHocPhan', 50)->unique();
            $table->integer('soTinChi');
            $table->string('donViPhuTrach', 50);
            $table->string('trangThaiHocPhan', 50);
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
        Schema::dropIfExists('hoc_phan');
    }
};