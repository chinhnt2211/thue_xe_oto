<?php

namespace App\Http\Requests\V1\Stations;

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
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        $method = $this->method();
        if($method === 'PUT'){
            return [
                'name' => ['required', 'string'],
                'phone' => ['required', 'string'],
                'capacity' => ['required', 'integer'],
            ];
        }
        return [
            'name' => ['sometimes','required', 'string'],
            'phone' => ['sometimes','required', 'string'],
            'capacity' => ['sometimes', 'required', 'integer'],
        ];
    }
}
