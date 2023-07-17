<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateScheduleRequest extends FormRequest
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
            "listSchedulesAdd" => ["nullable", "array"],
            "listSchedulesAdd.*.day" => ["
                required", "string", "in:LUNES,MARTES,MIERCOLES, 
                                        JUEVES,VIERNES,SABADO,DOMINGO"
            ],
            "listSchedulesAdd.*.hours" => ["required", "array"],
            "listSchedulesAdd.*.hours.*.startTime" => ["required", "date_format:H:i"],
            "listSchedulesAdd.*.hours.*.endTime" => ["required", "date_format:H:i"],

            "listSchedulesRemove" => ["nullable", "array"],
            "listSchedulesRemove.*" => ["numeric", "exists:schedule_courses,id"],
            
            "listSchedulesEdit" => ["nullable", "array"],
            "listSchedulesEdit.*.day" => ["
                required", "string", "in:LUNES,MARTES,MIERCOLES, 
                                        JUEVES,VIERNES,SABADO,DOMINGO"
            ],
            "listSchedulesEdit.*.hours" => ["required", "array"],
            "listSchedulesEdit.*.hours.*.startTime" => ["required", "date_format:H:i"],
            "listSchedulesEdit.*.hours.*.endTime" => ["required", "date_format:H:i"],
            "listSchedulesEdit.*.hours.*.id" => ["required", "numeric", "exists:schedule_courses,id"],
        ];
    }
}
