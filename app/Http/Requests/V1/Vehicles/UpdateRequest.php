<?php

namespace App\Http\Requests\V1\Vehicles;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
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
        $method = $this->getMethod();
        if ($method === 'PUT') {
            return [
                'name' => ['required', 'string'],
                'status' => ['required', 'integer'],
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
        return [
            'name' => ['sometimes', 'required', 'string'],
            'status' => ['sometimes', 'required', 'integer'],
            'seating_capacity' => ['sometimes', 'required', 'integer'],
            'description' => ['sometimes', 'required', 'string'],
            'license_number' => ['sometimes', 'required', 'string'],
            'price' => ['sometimes', 'required', 'integer'],
            'rent_price' => ['sometimes', 'required', 'integer'],
            'fine' => ['sometimes', 'required', 'integer'],
            'brand_id' => ['sometimes', 'required', 'integer'],
            'station_id' => ['sometimes', 'required', 'integer'],
        ];
    }

}
