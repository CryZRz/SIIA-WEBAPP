<?php

namespace App\Http\Controllers;

use App\Http\Helpers\Enums\RolesEnum;
use App\Http\Requests\UpsAndDownsStoreStudent;
use App\Http\Requests\UpsAndDownsStoreTeacher;
use App\Http\Resources\CourseResource;
use App\Models\Course;
use App\Models\CourseStudied;
use App\Models\QualificationCourse;
use Illuminate\Http\Request;

class UpsAndDownsController extends Controller
{
    public function index(Request $request){
        $userRole = $request->user()->role->name;

        if ($userRole == RolesEnum::STUDENT->value) {
            $userSmester = $request->user()->semester_id;
            $userEducationalPlan = $request->user()->educational_plan_id;

            $coursesAvailable = Course::where("semester_id", $userSmester)->where("educational_plan_id", $userEducationalPlan)->get();

            $coursesStuding = CourseStudied::where("student_id", $request->user()->id)->where("opportunity", 1)->where("finished", 0)
            ->get()
            ->map(function ($item){
                $itemAddStufingId = $item->course;
                $itemAddStufingId->courseStudiedId = $item->id;
                return $itemAddStufingId;
            });
            
            return [
                "coursesAvailable" => CourseResource::collection($coursesAvailable),
                "coursesStuding" => CourseResource::collection($coursesStuding)
            ];
        }
        if($userRole == RolesEnum::TEACHER->value){
            $coursesAvailable = Course::where("is_active", 1)
            ->where("teacher_id", null)
            ->get();
            $coursesStuding = Course::where("teacher_id", $request->user()->id)->get();
            
            return [
                "coursesAvailable" => CourseResource::collection($coursesAvailable),
                "coursesStuding" => CourseResource::collection($coursesStuding)
            ];
        }
    }

    public function storeStudent(UpsAndDownsStoreStudent $request){
        $data = $request->validated();

        if (count($data["coursesUps"]) > 0) {
            $listCoursesUpToInser = [];

            foreach ($data["coursesUps"] as $course) {
                $listCoursesUpToInser[] = [
                    "course_id" => $course["id"],
                    "opportunity" => 1,
                    "student_id" => auth()->user()->id
                ];
            }

            foreach ($listCoursesUpToInser as $course) {
                $courseStudiedInsert = CourseStudied::create($course);
                QualificationCourse::create([
                    "qualification" => null,
                    "status" => "CURSANDO",
                    "course_studied_id" => $courseStudiedInsert->id
                ]);
            }
        }

        if (count($data["coursesDowns"]) > 0){

            foreach ($data["coursesDowns"] as $course) {
                CourseStudied::find($course["courseStudiedId"])->delete();
                QualificationCourse::where("course_studied_id", $course["courseStudiedId"])->delete();
            }
            
        }


        return response()->make(null, 203);
    }

    public function storeTeacher(UpsAndDownsStoreTeacher $request){
        $data = $request->validated();

        if(count($data["coursesUps"]) > 0){
            
            foreach ($data["coursesUps"] as $courseUp) {
                $courseToChangeTeacher = Course::find($courseUp["id"]);
                $courseToChangeTeacher->teacher_id = $request->user()->id;
                $courseToChangeTeacher->save();
            }
        }
        if(count($data["coursesDowns"]) > 0){
            
            foreach ($data["coursesDowns"] as $courseDown) {
                $courseToChangeTeacher = Course::find($courseDown["id"]);
                $courseToChangeTeacher->teacher_id = null;
                $courseToChangeTeacher->save();
            }
        }

        return response()->make(null, 203);
    }
}
