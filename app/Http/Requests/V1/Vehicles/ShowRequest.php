<?php

namespace App\Http\Requests\V1\Vehicles;

use Illuminate\Foundation\Http\FormRequest;

class ShowRequest extends FormRequest
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
            'include' => ['array'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'include' => explode(",", $this->include),
        ]);
    }
}
