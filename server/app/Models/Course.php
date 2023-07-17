<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        "subject_id",
        "teacher_id",
        "team_id",
        "period_id",
        "semester_id",
        "educational_plan_id",
        "type_of_group"
    ];

    public function teacher(){
        return $this->belongsTo(User::class, "teacher_id", "id");
    }

    public function period(){
        return $this->belongsTo(Period::class);
    }

    public function subject(){
        return $this->belongsTo(Subject::class);
    }

    public function team(){
        return $this->belongsTo(Team::class);
    }

    public function semester(){
        return $this->belongsTo(Semester::class);
    }

    public function educationalPlan(){
        return $this->belongsTo(EducationalPlan::class);
    }

    public function schedule(){
        return $this->hasMany(ScheduleCourse::class);
    }

    public function students(){
        return $this->hasMany(CourseStudied::class);
    }
}

