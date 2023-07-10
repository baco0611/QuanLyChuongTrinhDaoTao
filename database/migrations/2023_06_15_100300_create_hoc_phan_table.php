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
        Schema::create('HocPhan', function (Blueprint $table) {
            $table->id('Id');
            $table->string('TenHocPhan', 250);
            $table->string('TenTiengAnh', 250)->nullable();
            $table->string('MaHocPhan', 50);
            $table->integer('SoTinChi');
            $table->string('DonViPhuTrach', 50)->nullable();
            $table->string('TrangThaiHocPhan', 50);
            $table->string('CreatedBy', 50)->nullable();
            $table->string('ModifiedBy', 50)->nullable();
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