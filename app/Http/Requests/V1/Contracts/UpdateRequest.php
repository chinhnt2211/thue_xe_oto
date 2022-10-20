<?php

namespace App\Http\Requests\V1\Contracts;

use Illuminate\Foundation\Http\FormRequest;

class UpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
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
                'ful_name' => ['required', 'string'],
                'email' => ['required', 'string', 'email'],
                'phone' => ['required', 'string'],
                'cic_number' => ['required', 'string'],
                'price' => ['required', 'integer'],
                'start_date' => ['required', 'date'],
                'end_date' => ['required', 'date'],
                'status' => ['required', 'integer']
            ];
        }

        return [
            'first_name' => ['sometimes', 'required', 'string'],
            'ful_name' => ['sometimes', 'required', 'string'],
            'email' => ['sometimes', 'required', 'string', 'email'],
            'phone' => ['sometimes', 'required', 'string'],
            'cic_number' => ['sometimes', 'required', 'string'],
            'price' => ['sometimes', 'required', 'integer'],
            'start_date' => ['sometimes', 'required', 'date'],
            'end_date' => ['sometimes', 'required', 'date'],
            'status' => ['sometimes', 'required', 'integer']
        ];
    }
}
