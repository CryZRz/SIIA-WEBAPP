<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpsAndDownsStoreStudent extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            "coursesUps" => ["nullable", "array"],
            "coursesUps.*.id" => ["required", "exists:courses,id"],
            "coursesDowns" => ["nullable", "array"],
            "coursesDowns.*.id" => ["required", "exists:courses,id"],
            "coursesDowns.*.courseStudiedId" => ["required", "exists:courses_studied,id"],
        ];
    }
}
