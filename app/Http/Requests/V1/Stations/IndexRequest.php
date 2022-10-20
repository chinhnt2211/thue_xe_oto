<?php

namespace App\Http\Requests\V1\Stations;

use Illuminate\Foundation\Http\FormRequest;

class IndexRequest extends FormRequest
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
            'name' => ['string'],
            'seating_capacity' => ['integer'],
            'min_capacity' => ['integer'],
            'max_capacity' => ['integer'],
            'include' => ['array'],
            'location' => ['array'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'include' => explode(",", $this->include),
        ]);
    }
}
