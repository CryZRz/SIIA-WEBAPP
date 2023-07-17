<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ScheduleCourse extends Model
{
    use HasFactory;

    protected $fillable = [
        "day",
        "start_time",
        "end_time",
        "course_id"
    ];
}
