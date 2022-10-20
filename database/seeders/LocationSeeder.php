<?php

namespace Database\Seeders;

use App\Models\Admin;
use App\Models\Location;
use App\Models\Station;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class LocationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        for ($x = 1; $x <= 50; $x++) {
            Location::create([
                'locatable_id' => $x,
                'locatable_type' => Station::class,
                'city' => fake()->city(),
                'district' => fake()->streetName(),
                'ward' => fake()->streetName(),
                'address' => fake()->streetAddress(),
            ]);
        }

        for ($x = 1; $x <= 52; $x++) {
            Location::create([
                'locatable_id' => $x,
                'locatable_type' => Admin::class,
                'city' => fake()->city(),
                'district' => fake()->streetName(),
                'ward' => fake()->streetName(),
                'address' => fake()->streetAddress(),
            ]);
        }
    }
}
