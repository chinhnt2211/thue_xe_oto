<?php

namespace App\Http\Requests\V1\Admins;

use App\Enums\AdminStatusEnum;
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
                'full_name' => ['required', 'string'],
                'password' => ['required', 'string'],
                'phone' => ['required', 'string'],
                'cic_number' => ['required', 'string'],
                'dob' => ['required', 'date'],
                'gender' => ['required', 'integer', Rule::in(GenderEnum::getAllEnums())],
                'role' => ['required', 'integer', Rule::in(RoleEnum::getAdminEnums())],
                'status' => ['required', 'integer', Rule::in(AdminStatusEnum::getAllEnums())],
                'station_id' => ['required', 'integer']
            ];
        }
        return [
            'full_name' => ['sometimes', 'required', 'string'],
            'password' => ['sometimes', 'required', 'string'],
            'phone' => ['sometimes', 'required', 'string'],
            'cic_number' => ['sometimes', 'required', 'string'],
            'dob' => ['sometimes', 'required', 'date'],
            'gender' => ['sometimes', 'required', 'integer', Rule::in(GenderEnum::getAllEnums())],
            'role' => ['sometimes', 'required', 'integer', Rule::in(RoleEnum::getAdminEnums())],
            'status' => ['sometimes', 'integer', Rule::in(AdminStatusEnum::getAllEnums())],
            'station_id' => ['sometimes', 'required', 'integer']
        ];
    }
}
