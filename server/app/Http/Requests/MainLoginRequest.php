<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MainLoginRequest extends FormRequest
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
            "email" => ["required", "email", "exists:users,email"],
            "password" => ["required"]
        ];
    }

    public function messages(){
        return [
            "email.required" => "El email es obligatorio",
            "email.email" => "Debes ingresar un email valido",
            "email.exists" => "Este email no esta registrado",
            "password" => "La contraseña es obligatoria"
        ];
    }
}
