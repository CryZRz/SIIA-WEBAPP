<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Foundation\Auth\User;

class CourseStudied extends Model
{
    use HasFactory;

    protected $table = "courses_studied";
    protected $fillable = [
        "course_id",
        "opportunity",
        "student_id"
    ];

    public function course(){
        return $this->belongsTo(Course::class);
    }

    public function student(){
        return $this->belongsTo(User::class, "student_id", "id");
    }

    public function qualification(){
        return $this->hasOne(QualificationCourse::class, "course_studied_id", "id");
    }
}
