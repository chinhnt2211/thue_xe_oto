<?php

namespace Database\Factories;

use App\Models\Station;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Station>
 */
class StationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {

        return [
            'name' => $this->faker->company(),
            'phone' => $this->faker->regexify('0[0-9]{9}'),
            'capacity' => $this->faker->numberBetween(100, 500),
        ];
    }
}
