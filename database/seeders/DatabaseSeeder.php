<?php

namespace Database\Seeders;

use App\Models\Bill;
use App\Models\Admin;
use App\Models\Brand;
use App\Models\Image;
use App\Models\Repair;
use App\Models\Station;
use App\Models\Vehicle;
use App\Models\Contract;
use App\Models\Location;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {

        Brand::factory(20)->create();

        Station::factory(50)->create();

        Admin::factory(50)->create();
        Vehicle::factory(100)->create();
        Contract::factory(100)->create();

        $this->call([
            LocationSeeder::class,
            AdminSeeder::class,
            ImageSeeder::class,
            BillSeeder::class,
        ]);


    }
}
