<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostRequest extends FormRequest
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
            "title" => ["required", "string", "max:255", "min:1"],
            "image" => ["required", "mimes:png,jpg,jpeg"]
        ];
    }

    public function messages(){
        return [
            "title.required" => "el titulo es requerido",
            "title.max" => "el maximo es de 255 caracteres",
            "title.min" => "el minimo es de 1 caracter",
            "image.required" => "la imagen es obligatoria",
            "image.mimes" => "la imagen debe ser de tipo png, jpg o jpeg",
        ];
    }
}
