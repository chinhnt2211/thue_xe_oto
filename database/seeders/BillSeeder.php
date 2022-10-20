<?php

namespace Database\Seeders;

use App\Enums\BillTypeEnum;
use App\Models\Admin;
use App\Models\Bill;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class BillSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for($i = 1; $i < 100; $i ++){
            Bill::create([
                'contract_id' => $i ,
                'admin_id' => fake()->randomElement(Admin::pluck('id')),
                'type' => fake()->randomElement(BillTypeEnum::getAllEnums()),
                'total' => fake()->numberBetween(1000,100000),
            ]);

            Bill::create([
                'contract_id' => $i ,
                'admin_id' => fake()->randomElement(Admin::pluck('id')),
                'type' => fake()->randomElement(BillTypeEnum::getAllEnums()),
                'total' => fake()->numberBetween(1000,100000),
            ]);
            Bill::create([
                'contract_id' => $i ,
                'admin_id' => fake()->randomElement(Admin::pluck('id')),
                'type' => fake()->randomElement(BillTypeEnum::getAllEnums()),
                'total' => fake()->numberBetween(1000,100000),
            ]);
        }
    }
}
