<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\UpdateScheduleRequest;
use App\Http\Resources\CourseResource;
use App\Http\Resources\UserResource;
use App\Models\Course;
use App\Models\Period;
use App\Models\ScheduleCourse;
use App\Models\Subject;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;

class AdminCourseController extends Controller
{
    public function index(){
        $courses = Course::paginate(10);
        
        return CourseResource::collection($courses);
    }

    public function studentsOfCourse(Course $course){
        $students = $course->students->map(function($item){
            return $item->student;
        });

        return UserResource::collection($students);
    }

    public function updateSubject(Course $course, Subject $subject){
        $course->subject_id = $subject->id;
        $course->save();

        return response()->make(null, 204);
    }
    
    public function updateTeacher(Course $course, User $user){
        $course->teacher_id = $user->id;
        $course->save();

        return response()->make(null, 204);
    }

    public function updateTeam(Course $course, Team $team){
        $course->team_id = $team->id;
        $course->save();

        return response()->make(null, 204);
    }

    public function updatePeriod(Course $course, Period $period){
        $course->period_id = $period->id;
        $course->save();

        return response()->make(null, 204);
    }

    public function updateSchedule(Course $course, UpdateScheduleRequest $request){
        $data = $request->validated();
    
        if ($data["listSchedulesAdd"]) {

            foreach ($data["listSchedulesAdd"] as $schedule) {
                foreach ($schedule["hours"] as $hour) {
                    ScheduleCourse::create([
                        "day" => $schedule["day"],
                        "start_time" => $hour["startTime"],
                        "end_time" => $hour["endTime"],
                        "course_id" => $course->id
                    ]);
                }
            }
        }
        if ($data["listSchedulesEdit"]) {
            
            foreach ($data["listSchedulesEdit"] as $schedule) {
                foreach ($schedule["hours"] as $hour) {

                    $scheduleFind = ScheduleCourse::find($hour["id"]);
                    $scheduleFind->day = $schedule["day"]; 
                    $scheduleFind->start_time = $hour["startTime"]; 
                    $scheduleFind->end_time = $hour["endTime"]; 
                    $scheduleFind->save();
                }
            }
        }
        if ($data["listSchedulesRemove"]) {
            foreach ($data["listSchedulesRemove"] as $schedule) {
                ScheduleCourse::find($schedule)->delete();
            }
        }

        return response()->make(null, 204);
    }

    public function destroy(Course $course){
        $course->delete();
        
        return response()->make(null, 204);
    }

    public function save(Request $request){
        $this->validate($request, [
            "subjectId" => ["required", "numeric", "exists:subjects,id"], 
            "teacherId" => ["nullable", "exists:users,id"], 
            "teamId" => ["required", "numeric", "exists:users,id"], 
            "periodId" => ["required", "nullable", "exists:periods,id"], 
            "typeOfGroup" => ["required", "in:ORDINARIO,REGULARIZACION"],
            "educationalPlanId" => ["required", "numeric", "exists:educational_plans,id"],
            "semesterId" => ["required", "numeric", "exists:semesters,id"]
        ]);

        Course::create([
            "subject_id" => $request->subjectId,
            "teacher_id" => $request->teacherId,
            "team_id" => $request->teamId,
            "period_id" => $request->periodId,
            "semester_id" => $request->semesterId,
            "educational_plan_id" => $request->educationalPlanId,
            "type_of_group" => $request->typeOfGroup
        ]);

        return response()->make(null, 204);
    }
    
}
