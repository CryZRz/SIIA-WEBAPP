<?php

namespace App\Http\Controllers;

use App\Http\Resources\CourseResource;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(){
        $courses = Course::paginate(10);

        return CourseResource::collection($courses);
    }

    public function upsAndDowns(Request $request){

    }
}

