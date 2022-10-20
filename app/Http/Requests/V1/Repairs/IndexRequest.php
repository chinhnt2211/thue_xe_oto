<?php

namespace App\Http\Requests\V1\Repairs;

use App\Enums\RepairEnum;
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
            'admin_id' => ['integer'],
            'vehicle_id' => ['integer'],
            'min_fee' => ['integer'],
            'max_fee' => ['integer'],
            'min_date' => ['date'],
            'max_date' => ['date'],
            'status' => ['integer', Rule::in(RepairEnum::getAllEnums())],
            'created_at' => ['datetime'],
            'updated_at' => ['datetime'],
            'include' => ['array']
        ];
    }

    protected function prepareForValidation()
    {
        $this->merge([
            'include' => explode(",", $this->include),
        ]);
    }
}
