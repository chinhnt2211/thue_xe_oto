<?php

namespace App\Http\Requests\V1\Admins;

use Illuminate\Foundation\Http\FormRequest;

class UpdateLocationRequest extends FormRequest
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
    public function rules()
    {
        $method = $this->method();
        if ($method === 'PUT') {
            return [
                'city' => ['required', 'string'],
                'district' => ['required', 'string'],
                'ward' => ['required', 'string'],
                'address' => ['required', 'string'],
            ];
        };
        return [
            'city' => ['sometimes', 'required', 'string'],
            'district' => ['sometimes', 'required', 'string'],
            'ward' => ['sometimes', 'required', 'string'],
            'address' => ['sometimes', 'required', 'string'],
        ];
    }
}
