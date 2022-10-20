<?php

namespace App\Http\Requests\V1\Vehicles;

use Illuminate\Foundation\Http\FormRequest;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string'],
            'seating_capacity' => ['required', 'integer'],
            'description' => ['required', 'string'],
            'license_number' => ['required', 'string'],
            'price' => ['required', 'integer'],
            'rent_price' => ['required', 'integer'],
            'fine' => ['required', 'integer'],
            'brand_id' => ['required', 'integer'],
            'station_id' => ['required', 'integer'],
        ];
    }
}
