<?php

namespace App\Http\Requests\V1\Admins;

use App\Enums\RoleEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize(): bool
    {
//        return auth()->check();
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'first_name' => ['string'],
            'last_name' => ['string'],
            'email' => ['string'],
            'role' => ['integer', Rule::in(RoleEnum::getAdminEnums())],
            'cic_number' => ['string'],
            'include' => ['array'],
            'location' => ['array'],
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'include' => explode(",", $this->include),
        ]);
    }
}
