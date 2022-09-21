<?php

namespace App\Http\Requests\V1\Admins;

use Illuminate\Foundation\Http\FormRequest;

class UpdateImageRequest extends FormRequest
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
                'avatar' => ['required', 'string'],
                'cic_front' => ['required', 'string'],
                'cic_back' => ['required', 'string'],
            ];
        };
        return [
            'avatar' => ['sometimes', 'required', 'string'],
            'cic_front' => ['sometimes', 'required', 'string'],
            'cic_back' => ['sometimes', 'required', 'string'],
        ];
    }
}
