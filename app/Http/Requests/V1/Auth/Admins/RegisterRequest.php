<?php

namespace App\Http\Requests\V1\Auth\Admins;

use App\Enums\RoleEnum;
use App\Enums\AdminStatusEnum;
use App\Enums\GenderEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterRequest extends FormRequest
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
        return [
            'first_name' => ['required', 'string'],
            'last_name' => ['required', 'string'],
            'email' => ['required', 'string', 'email'],
            'phone' => ['required', 'string'],
            'password' => ['required', 'string'],
            'cic_number' => ['required', 'string'],
            'dob' => ['required', 'date'],
            'gender' => ['required', 'integer', Rule::in(GenderEnum::getAllEnums())],
            'role' => ['required', 'integer', Rule::in(RoleEnum::getAllEnums())],
            'status' => ['required', 'integer', Rule::in(AdminStatusEnum::getAllEnums())],
        ];
    }
}
