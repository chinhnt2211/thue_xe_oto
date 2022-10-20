<?php

namespace App\Http\Requests\V1\Contracts;

use App\Enums\ContractStatusEnum;
use App\Enums\PaymentTypeEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PaymentRequest extends FormRequest
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
            'total' => ['required', 'integer'],
            'type' => ['required', 'integer', Rule::in(PaymentTypeEnum::getAllEnums())],
        ];
    }
}
