<?php

namespace App\Http\Requests\V1\Users;

use App\Enums\RoleEnum;
use App\Enums\AdminStatusEnum;
use App\Enums\GenderEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

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
                'first_name' => ['required', 'string'],
                'last_name' => ['required', 'string'],
                'email' => ['required', 'string', 'email'],
                'phone' => ['required', 'string'],
                'password' => ['required', 'string'],
                'dob' => ['required', 'date'],
                'gender' => ['required', 'integer', Rule::in(GenderEnum::getAllEnums())],
                'status' => ['required', 'integer', Rule::in(AdminStatusEnum::getAllEnums())],
            ];
        }
        return [
            'first_name' => ['sometimes', 'required', 'string'],
            'last_name' => ['sometimes', 'required', 'string'],
            'email' => ['sometimes', 'required', 'string', 'email'],
            'phone' => ['sometimes', 'string'],
            'password' => ['sometimes', 'required', 'string'],
            'dob' => ['sometimes', 'date'],
            'gender' => ['sometimes', 'integer', Rule::in(GenderEnum::getAllEnums())],
            'status' => ['sometimes', 'integer', Rule::in(AdminStatusEnum::getAllEnums())],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'with' => explode(",", $this->include),
        ]);
    }
}
