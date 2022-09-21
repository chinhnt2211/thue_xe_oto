<?php

namespace App\Http\Requests\V1\Auth\Users;

use Illuminate\Foundation\Http\FormRequest;

class LogoutRequest extends FormRequest
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
     * @return array
     */
    public function rules()
    {
        return [
            'options' => ['string'],
        ];
    }

//    protected function prepareForValidation()
//    {
//        $this->merge([
//            'options' => explode(",", $this->options),
//        ]);
//    }
}
