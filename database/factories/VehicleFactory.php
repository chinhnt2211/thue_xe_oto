<?php

namespace Database\Factories;

use App\Models\Brand;
use App\Models\Station;
use Faker\Provider\Fakecar;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vehicle>
 */
class VehicleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $this->faker->addProvider(new Fakecar($this->faker));

        $price = ($this->faker->randomNumber(2)+1)*1000*1000;

        return [
            'name' => $this->faker->vehicle,
            'description' => $this->faker->sentence(),
            'license_number' => $this->faker->vehicleRegistration,
            'price' => $price,
            'rent_price' => $price/10,
            'fine' => $price/10*1.5,
            'station_id' => $this->faker->randomElement(Station::get()->pluck('id')),
            'brand_id' => $this->faker->randomElement(Brand::get()->pluck('id')),
            'seating_capacity' => $this->faker->randomElement([4,5,7,9,11,16]),
        ];
    }
}
