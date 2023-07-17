<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class CommentPostRequest extends FormRequest
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
            "comment" => ["required", "string", "min:1", "max:255"],
            "postId" => ["required", "numeric", "exists:posts,id"]
        ];
    }

    public function messages(){
        return [
            "comment.required" => "El comentario es obligatorio",
            "comment.min" => "El comentario debe tener minimo 1 caracter",
            "comment.max" => "El comentario debe tener maximo 255 caracteres",
            "postId.required" => "El id del post es obligatorio",
            "postId.exists" => "El post no existe"
        ];
    }
}
