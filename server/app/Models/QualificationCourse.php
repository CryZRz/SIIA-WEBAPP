<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class QualificationCourse extends Model
{
    use HasFactory;

    protected $table = "qualifications_course";

    protected $fillable = [
        "qualification",
        "status",
        "course_studied_id"
    ];
}
