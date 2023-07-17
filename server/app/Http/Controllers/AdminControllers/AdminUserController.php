<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use App\Http\Helpers\Enums\RolesEnum;
use App\Http\Helpers\FormatCourseStudied;
use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\CourseStudiedResource;
use App\Http\Resources\UserResource;
use App\Models\CourseStudied;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class AdminUserController extends Controller
{
    public function index(){
        $users = User::paginate(10);

        return UserResource::collection($users);
    }

    public function indexStudents(){
        $users = User::whereHas("role", function($query){
                $query->where("name", RolesEnum::STUDENT->value);
            })->paginate(10);

        return UserResource::collection($users);
    }

    public function indexTeachers(){
        $users = User::whereHas("role", function($query){
                $query->where("name", RolesEnum::TEACHER->value);
            })->paginate(10);

        return UserResource::collection($users);
    }

    public function showCourses(User $user){
        if($user->role->name == RolesEnum::STUDENT->value){
            $coursesStudied = CourseStudied::where("student_id", $user->id)
            ->get();

            $coursesStudiedColl = CourseStudiedResource::collection($coursesStudied);
            $coursesStudiedArr = $coursesStudiedColl->jsonSerialize();
            $coursesStudiedFormat = FormatCourseStudied::formatCourseStudied($coursesStudiedArr);
            
            
            return $coursesStudiedFormat;
        }
    }

    public function updateStudentCourse(User $user, Request $request){
        if ($user->role->name == RolesEnum::STUDENT->value) {

            $this->validate($request, [
                "oldCourse" => ["required", "numeric", "exists:courses_studied,id"],
                "newCourse" => ["required", "numeric", "exists:courses,id"]
            ]);

            $courseStudied = CourseStudied::find($request->oldCourse);
            $courseStudied->course_id = $request->newCourse;
            $courseStudied->save();

            return response()->make(null, 204);
        }
    }
}

