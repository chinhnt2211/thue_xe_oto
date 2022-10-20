<?php

namespace App\Http\Requests\V1\Contracts;

use App\Enums\ContractStatusEnum;
use Carbon\Carbon;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class IndexRequest extends FormRequest
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
            'user_id' => ['integer'],
            'admin_id' => ['integer'],
            'vehicle_id' => ['integer'],
            'first_name' => ['string'],
            'last_name' => ['string'],
            'cic_number' => ['string'],
            'status' => ['integer', Rule::in(ContractStatusEnum::getAllEnums())],
            'min_price' => ['integer'],
            'max_price' => ['integer'],
            'min_paid' => ['integer'],
            'min_date' => ['date'],
            'max_date' => ['date'],
        ];
    }

    protected function prepareForValidation()
    {
        if (isset($this->min_date)) {
            $this->merge([
                'min_date' => Carbon::createFromFormat('Y-m-d', $this->min_date)->format('Y-m-d'),
            ]);

        }
        if (isset($this->max_date)) {
            $this->merge([
                'max_date' => Carbon::createFromFormat('Y-m-d', $this->max_date)->format('Y-m-d'),
            ]);

        }
    }
}
