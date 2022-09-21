<?php

namespace App\Http\Requests\V1\Admins;

use App\Enums\GenderEnum;
use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
    public function rules()
    {
        $method = $this->method();
        if ($method === 'PUT') {
            return [
                'first_name' => ['required', 'string'],
                'last_name' => ['required', 'string'],
                'email' => ['required', 'string', 'email'],
                'password' => ['required', 'string'],
                'phone' => ['required', 'string'],
                'cic_number' => ['required', 'string'],
                'dob' => ['required', 'date'],
                'gender' => ['required', 'integer', Rule::in(GenderEnum::getAllEnums())],
                'role' => ['required', 'integer', Rule::in(RoleEnum::getAdminEnums())],
                'station_id' => ['required', 'integer']
            ];
        }
        return [
            'first_name' => ['sometimes', 'required', 'string'],
            'last_name' => ['sometimes', 'required', 'string'],
            'email' => ['sometimes', 'required', 'string', 'email'],
            'phone' => ['sometimes', 'required', 'string'],
            'cic_number' => ['sometimes', 'required', 'string'],
            'dob' => ['sometimes', 'required', 'date'],
            'gender' => ['sometimes', 'required', 'integer', Rule::in(GenderEnum::getAllEnums())],
            'role' => ['sometimes', 'required', 'integer', Rule::in(RoleEnum::getAdminEnums())],
            'station_id' => ['sometimes', 'required', 'integer']
        ];
    }
}
