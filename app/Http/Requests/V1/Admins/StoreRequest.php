<?php

namespace App\Http\Requests\V1\Admins;

use App\Enums\GenderEnum;
use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
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
        return [
            'full_name' => ['required', 'string'],
            'email' => ['required', 'string', 'email'],
            'phone' => ['required', 'string'],
            'password' => ['required', 'string'],
            'cic_number' => ['required', 'string'],
            'dob' => ['required', 'date'],
            'gender' => ['required', 'integer', Rule::in(GenderEnum::getAllEnums())],
            'role' => ['required', 'integer', Rule::in(RoleEnum::getAdminEnums())],
            'station_id' => ['integer']
        ];
    }
}
