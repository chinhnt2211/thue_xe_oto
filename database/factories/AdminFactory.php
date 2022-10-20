<?php

namespace Database\Factories;

use App\Models\Image;
use App\Models\Station;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Admin>
 */
class AdminFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        return [
            'full_name' => $this->faker->firstName(),
            'email' => $this->faker->safeEmail(),
            'phone' => $this->faker->regexify('0[0-9]{9}'),
            'password' => $this->faker->password(),
            'cic_number' => $this->faker->regexify('0[0-9]{11}'),
            'dob' => $this->faker->dateTimeBetween('-50 years', '-20 years')->format('Y-m-d'),
            'gender' => $this->faker->numberBetween(0,1),
            'role' => 1,
            'status' => $this->faker->numberBetween(0,2),
            'station_id' => Station::query()->inRandomOrder()->value('id')
        ];
    }
}
