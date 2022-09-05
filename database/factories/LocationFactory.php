<?php

namespace Database\Factories;

use App\Models\District;
use App\Models\Subdistrict;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Location>
 */
class LocationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $subdistrict_id = $this->faker->randomElement(Subdistrict::query()->get('id'));
        $district_id = Subdistrict::query()->where('id','=', $subdistrict_id->id)->value('district_id');
        $city_id = District::query()->where('id','=', $district_id)->value('city_id');
        return [
            'type' =>$this->faker->numberBetween(0,1),
            'city_id' =>$city_id,
            'district_id' =>$district_id,
            'subdistrict_id' =>$subdistrict_id,
        ];
    }
}
