<?php

namespace Database\Factories;

use App\Enums\ContractStatusEnum;
use App\Models\Admin;
use App\Models\Vehicle;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Contract>
 */
class ContractFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()

    {
        $admin_id = $this->faker->randomElement(Admin::where('status', '=', '0')->pluck('id'));
        $vehicle_id = $this->faker->randomElement(Vehicle::pluck('id'));
        $start_date = $this->faker->dateTimeBetween('-10 month', $max = 'now')->format('Y-m-d');
        $end_date = date('Y-m-d', strtotime($start_date . ' +' . $this->faker->randomDigit(2) .' day'));
        $price = Vehicle::where('id', '=', $vehicle_id)->value('rent_price') ;

        return [
            'admin_id' => $admin_id,
            'vehicle_id' => $vehicle_id,
            'full_name' => $this->faker->name(),
            'phone' => $this->faker->regexify('0[0-9]{9}'),
            'email' => $this->faker->email(),
            'cic_number' => $this->faker->regexify('0[0-9]{11}'),
            'status' => $this->faker->randomElement(ContractStatusEnum::getAllEnums()),
            'price' => $price,
            'paid' => $this->faker->numberBetween(0,$price),
            'start_date' => $start_date,
            'end_date' => $end_date,
        ];
    }
}
