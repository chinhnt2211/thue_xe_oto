<?php

namespace Database\Factories;

use App\Models\Location;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Station>
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
            'name' => $this->faker->name(),
            'address_line_2' => $this->faker->unique()->randomElement(Subdistrict::query()->get('id')),
            'address_line_1' => $this->faker->streetAddress(),
            'phone' => $this->faker->regexify('0[0-9]{9}'),
            'capacity' => $this->faker->numberBetween(100, 500),
        ];
    }
}
