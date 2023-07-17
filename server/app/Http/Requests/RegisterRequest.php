<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            "password" => ["required", "confirmed"],
            "image" => ["nullable", "mimes:png,jpg"],
            "role" => ["required", "integer", "in:1,2,3"],
            "direction" => ["required", "string", "max:100"],
            "teamId" => ["nullable", "integer"],
            "semesterId" => ["nullable", "integer"],
            "educationalPlanId" => ["nullable", "integer"],
            "profileId" => ["nullable, integer"]
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
            "email.exists" => "Esa cuenta no existe",
            "password" => "El password es obligatorio",
            "image.mimes" => "Debes usar un formati de imagen valido",
            "direction.required" => "La direccion es obligatoria",
            "direction.max" => "La direccion no puede ser mayor a 50",
        ];
    }

}
