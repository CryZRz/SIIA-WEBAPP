<?php

namespace App\Http\Controllers;

use App\Http\Helpers\Enums\RolesEnum;
use App\Http\Helpers\FormatCourseStudied;
use App\Http\Requests\KardexStoreRequest;
use App\Http\Resources\CourseKardexTeacherResource;
use App\Http\Resources\CourseStudiedResource;
use App\Models\Course;
use App\Models\CourseStudied;
use App\Models\QualificationCourse;
use Illuminate\Http\Request;

class KardexController extends Controller
{
    public function index(Request $request){
        if($request->user()->role->name == RolesEnum::STUDENT->value){

            $coursesStudied = CourseStudied::where("student_id", $request->user()->id)
            ->get();

            $coursesStudiedColl = CourseStudiedResource::collection($coursesStudied);
            $coursesStudiedFormat = FormatCourseStudied::formatCourseStudied($coursesStudiedColl->collection->toArray());

            return $coursesStudiedFormat;
        }
        if($request->user()->role->name == RolesEnum::TEACHER->value){
            $coursesTeacher = Course::where("teacher_id", $request->user()->id)
            ->where("is_active", 1)->get();

            return CourseKardexTeacherResource::collection($coursesTeacher);
        }
    }

    public function store(KardexStoreRequest $request){
        $data = $request->validated();

        foreach ($data["qualifications"] as $quialification) {
            $qualificationCourse = QualificationCourse::find($quialification["id"]);
            $qualificationCourse->qualification = $quialification["qualification"];
            $qualificationCourse->save();
        }

        return response()->make(null, 203);
    }
}
