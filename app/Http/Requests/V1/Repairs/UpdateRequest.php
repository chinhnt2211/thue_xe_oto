<?php

namespace App\Http\Requests\V1\Repairs;

use App\Enums\RepairEnum;
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
        return false;
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
                'admin_id' => ['required', 'integer'],
                'vehicle_id' => ['required', 'integer'],
                'fee' => ['required', 'integer'],
                'start_date' => ['required', 'date'],
                'end_date' => ['required', 'date'],
                'description' => ['required', 'string'],
                'status' => ['required', 'integer', Rule::in(RepairEnum::getAllEnums())],
            ];
        }

        return [
            'admin_id' => ['sometimes', 'required', 'integer'],
            'vehicle_id' => ['sometimes', 'required', 'integer'],
            'fee' => ['sometimes', 'required', 'integer'],
            'start_date' => ['sometimes', 'required', 'date'],
            'end_date' => ['sometimes', 'required', 'date'],
            'description' => ['sometimes', 'required', 'string'],
            'status' => ['sometimes', 'required', 'integer', Rule::in(RepairEnum::getAllEnums())],
        ];

    }
}
