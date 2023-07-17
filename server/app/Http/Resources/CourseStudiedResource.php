<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CourseStudiedResource extends JsonResource
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
            "finished" => $this->finished,
            "opportunity" => $this->opportunity,
            "student" => $this->student,
            "course" => new CourseResource($this->course),
            "qualification" => $this->qualification,
            "createdAt" => $this->created_at,
            "updatedAt" => $this->updated_at
        ];
    }
}
