<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UserUpdateRequest extends FormRequest
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
            "email" => ["required", "unique:users,email,".auth()->user()->id, "email"],
            "description" => ["nullable", "string", "max:100", "min:1"],
            "linkFacebook" => ["nullable", "string"],
            "linkIg" => ["nullable", "string"],
            "linkTwitter" => ["nullable", "string"],
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
            "description.string" => "La direccion es obligatoria",
            "description.max" => "La direccion no puede ser mayor a 100",
            "description.min" => "La direccion no puede ser menor a 1",
        ];
    }
}
