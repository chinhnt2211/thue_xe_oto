<?php

namespace App\Http\Requests\V1\Contracts;

use App\Enums\ContractStatusEnum;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreRequest extends FormRequest
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
        return [
            'admin_id' =>['required', 'integer'],
            'vehicle_id' =>['required', 'integer'],
            'full_name' =>['required', 'string'],
            'email' =>['required', 'email'],
            'phone' =>['required', 'string'],
            'cic_number' =>['required', 'string'],
            'price' =>['required', 'integer'],
            'paid' =>['required', 'integer'],
            'start_date' => ['required', 'date'],
            'end_date' => ['required', 'date'],
        ];
    }
}
