<?php

namespace App\Http\Resources;

use App\Http\Helpers\FormatSchdules;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseKardexTeacherResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "teacher" => new UserResource($this->teacher),
            "period" => $this->period,
            "subject" => $this->subject,
            "team" => $this->team,
            "smester" => $this->semester,
            "educationalPlan" => $this->educationalPlan,
            "schedule" => FormatSchdules::formatSchedule($this->schedule->groupBy("day")),
            "typeOfGroud" => $this->type_of_group,
            "cratedAt" => $this->created_at,
            "updatedAt" => $this->updated_at,
            "students" => CourseStudiedResource::collection($this->students) 
        ];
    }
}
