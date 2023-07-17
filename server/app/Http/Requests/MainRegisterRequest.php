<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class MainRegisterRequest extends FormRequest
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
            "name" => ["required", "max:50", "string"],
            "lastName" => ["required", "max:50", "string"],
            "email" => ["required", "unique:users,email", "email"],
            "password" => ["required", "min:6", "max:20"],
            "role" => ["required", "integer", "in:1,2,3"],
            "direction" => ["required", "string", "max:100"]
        ];
    }

    public function messages(){
        return [
            "name.required" => "El nombre es requerido",
            "name.max" => "El nombre no debe ser mayor a 50",
            "lastName.required" => "El nombre es requerido",
            "lastName.max" => "El nombre no debe ser mayor a 50",
            "email.required" => "El email es obligatorio",
            "email.email" => "El email no es valido",
            "password.required" => "El password es obligatorio",
            "password.min" => "El password debe ser minimo de 8",
            "password.max" => "El password debe ser maximo de 20",
            "direction.required" => "La direccion es obligatoria",
            "direction.max" => "La direccion no puede ser mayor a 50",
        ];
    }
}
