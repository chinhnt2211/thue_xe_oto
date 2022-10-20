<?php

namespace App\Http\Requests\V1\Bills;

use App\Enums\PaymentTypeEnum;
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
    public function authorize(): bool
    {
        return auth()->check();
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'contract_id' => ['integer'],
            'admin_id' => ['integer'],
            'type' => ['integer', Rule::in(PaymentTypeEnum::getAllEnums())],
            'start_date' => ['date'],
            'end_date' => ['date'],
        ];
    }

    protected function prepareForValidation()
    {
        if (isset($this->start_date)) {
            $this->merge([
                'start_date' => Carbon::createFromFormat('Y-m-d', $this->start_date)->format('Y-m-d'),
            ]);

        }
        if (isset($this->end_date)) {
            $this->merge([
                'end_date' => Carbon::createFromFormat('Y-m-d', $this->end_date)->format('Y-m-d'),
            ]);

        }
    }
}
