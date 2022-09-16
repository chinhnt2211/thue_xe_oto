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
        Schema::create('contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained();
            $table->foreignId('admin_id')->constrained();
            $table->foreignId('vehicle_id')->constrained();
            $table->string('full_name')->nullable();
            $table->string('cic_number',12)->nullable();
            $table->unsignedBigInteger('cic_front')->nullable();
            $table->unsignedBigInteger('cic_back')->nullable();
            $table->foreign('cic_front')->references('id')->on('images');
            $table->foreign('cic_back')->references('id')->on('images');
            $table->string('address_line_1')->nullable();
            $table->unsignedBigInteger('address_line_2')->nullable();
            $table->foreign('address_line_2')->references('id')->on('wards');
            $table->tinyInteger('status');
            $table->unsignedBigInteger('contract_image')->nullable();
            $table->foreign('contract_image')->references('id')->on('images');
            $table->unsignedInteger('price');
            $table->unsignedTinyInteger('deposit_percent')->nullable();
            $table->date('start_date');
            $table->date('end_date');
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
        Schema::dropIfExists('contracts');
    }
};
