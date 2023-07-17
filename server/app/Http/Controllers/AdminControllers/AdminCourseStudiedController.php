<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use App\Http\Helpers\Enums\TypesOfGroupEnum;
use App\Models\Course;
use App\Models\CourseStudied;
use App\Models\QualificationCourse;
use App\Models\User;
use Illuminate\Http\Request;

class AdminCourseStudiedController extends Controller
{
    public function updateQualification(CourseStudied $courseStudied, Request $request){
        $this->validate($request, [
            "qualification" => ["string", "required", "max:10", "min:1"]
        ]);

        $quaificatonCourse = $courseStudied->qualification;
        $quaificatonCourse->qualification = $request->qualification;
        $quaificatonCourse->save();

        return response()->make(null, 204);
    }

    public function addOpportunity(User $user, Request $request){
        $this->validate($request, [
            "periodId" => ["numeric", "required", "exists:periods,id"],
            "teacherId" => ["required", "numeric", "exists:users,id"],
            "subjectId" => ["required", "numeric", "exists:subjects,id"],
            "opportunity" => ["required", "numeric", "max:4", "min:2"]
        ]);

        $subjectId = $request->subjectId;
        $teacherId = $request->teacherId;
        $periodId = $request->periodId;

        $findCourse = Course::where("subject_id", $subjectId)
        ->where("teacher_id", $teacherId)
        ->where("period_id", $periodId)
        ->where("type_of_group", TypesOfGroupEnum::REGULARIZATION->value)
        ->where("is_active", 1)
        ->where("educational_plan_id", $user->educational_plan_id)
        ->first();

        if (!$findCourse) {

            $courseCreated = Course::create([
                "subject_id" => $subjectId,
                "teacher_id" => $teacherId,
                "team_id" => 24,
                "period_id" => $periodId,
                "semester_id" => null,
                "educational_plan_id" => $user->educational_plan_id,
                "type_of_group" => TypesOfGroupEnum::REGULARIZATION->value
            ]);

            $courseStudiedCreated = CourseStudied::create([
                "course_id" => $courseCreated->id,
                "opportunity" => $request->opportunity,
                "student_id" => $user->id
            ]);

            QualificationCourse::create([
                "qualification" => null,
                "status" => "CURSANDO",
                "course_studied_id" => $courseStudiedCreated->id
            ]);

            return response()->make(null, 204);
        }else{

            $courseStudiedCreated = CourseStudied::create([
                "course_id" => $findCourse->id,
                "opportunity" => $request->opportunity,
                "student_id" => $user->id
            ]);

            QualificationCourse::create([
                "qualification" => null,
                "status" => "CURSANDO",
                "course_studied_id" => $courseStudiedCreated->id
            ]);

            return response()->make(null, 204);
        }
    }

    public function destroy(CourseStudied $courseStudied){
        $qualification = $courseStudied->qualification;
        $qualification->delete();
        $courseStudied->delete();

        return response()->make(null, 204);
    }

    public function save(Course $course, User $user){
        $courseStudied = CourseStudied::create([
            "course_id" => $course->id,
            "opportunity" => 1,
            "student_id" => $user->id
        ]);

        QualificationCourse::create([
            "qualification" => null,
            "status" => "CURSANDO",
            "course_studied_id" => $courseStudied->id
        ]);

        return response()->make(null, 204);
    }
}
