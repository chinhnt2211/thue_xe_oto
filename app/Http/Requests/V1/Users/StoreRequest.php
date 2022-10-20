<?php

namespace App\Http\Requests\V1\Users;

use App\Enums\RoleEnum;
use App\Enums\AdminStatusEnum;
use App\Enums\GenderEnum;
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
            'phone' => ['string'],
            'avatar' => ['string'],
            'password' => ['required', 'string'],
            'dob' => ['date'],
            'gender' => ['integer', Rule::in(GenderEnum::getAllEnums())],
            'status' => ['integer', Rule::in(AdminStatusEnum::getAllEnums())],
            'location' => ['required', 'array'],
            'with' => ['array']
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'with' => explode(",", $this->include),
        ]);
    }
}
