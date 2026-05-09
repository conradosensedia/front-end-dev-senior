<?php

declare(strict_types=1);

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreBoardRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'min:3', 'max:255'],
            'description' => ['nullable', 'string', 'max:1000'],
            'theme_color' => ['required', 'string', 'regex:/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/'],
            'icon_key' => ['required', 'string', 'in:rocket,chart,layout,megaphone,bug,palette'],
        ];
    }

    protected function failedValidation(\Illuminate\Contracts\Validation\Validator $validator)
    {
    throw new \Illuminate\Http\Exceptions\HttpResponseException(
        response()->json([
            'errors' => $validator->errors(),
            'message' => 'Validation error detected by Request.'
        ], 422)
    );
    }
}
