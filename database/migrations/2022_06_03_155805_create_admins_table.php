<?php

use App\Enums\GenderEnum;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('admins', function (Blueprint $table) {
            $table->id();
            $table->string('full_name');
            $table->string('email')->unique();
            $table->string('phone', 15);
            $table->string('password');
            $table->string('cic_number', 12);
            $table->date('dob');
            $table->tinyInteger('gender')->comment("GenderEnum")->default(GenderEnum::MALE);
            $table->tinyInteger('role')->comment("RoleEnum");
            $table->tinyInteger('status')->comment("AdminStatusEnum")
                ->default(\App\Enums\AdminStatusEnum::WORKING)->index();
            $table->foreignId('station_id')->nullable()->constrained()->nullOnDelete();
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
        Schema::dropIfExists('admins');
    }
};
