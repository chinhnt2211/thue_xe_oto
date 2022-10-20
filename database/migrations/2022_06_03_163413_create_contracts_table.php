<?php

use App\Enums\ContractStatusEnum;
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
            $table->foreignId('admin_id')->nullable()->constrained()->nullOnDelete();
            $table->foreignId('vehicle_id')->nullable()->constrained()->nullOnDelete();
            $table->string('full_name')->nullable();
            $table->string('phone', 15);
            $table->string('email')->nullable();
            $table->string('cic_number',12)->nullable();
            $table->tinyInteger('status')
                ->comment('Contract Status Enum')
                ->default(ContractStatusEnum::PROCESSING);
            $table->unsignedInteger('price');
            $table->unsignedInteger('paid')->default(0);
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
