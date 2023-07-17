<?php

use App\Http\Controllers\AdminControllers\AdminCourseController;
use App\Http\Controllers\AdminControllers\AdminCourseStudiedController;
use App\Http\Controllers\AdminControllers\AdminSubjectController;
use App\Http\Controllers\AdminControllers\AdminUserController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\EventsController;
use App\Http\Controllers\KardexController;
use App\Http\Controllers\MainAuth\AuthController;
use App\Http\Controllers\NoticesController;
use App\Http\Controllers\PeriodController;
use App\Http\Controllers\PostController;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\UpsAndDownsController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->group(function (){
    //auth
    Route::post("/logout", [AuthController::class, "logout"]);

    //users
    Route::get("/user", [AuthController::class, "user"]);
    Route::get("/user/{user}", [UserController::class, "show"]);
    Route::put("/user/{user}", [UserController::class, "update"]);
    Route::patch("/user/{user}/image", [UserController::class, "updateImage"]);

    //posts
    Route::post("/posts", [PostController::class, "store"]);
    Route::get("/posts", [PostController::class, "index"]);
    Route::put("/post/{post}", [PostController::class, "update"]);
    Route::delete("/post/{post}", [PostController::class, "destroy"]);

    //comments
    Route::post("/comments", [CommentController::class, "store"]);
    Route::delete("/comment/{commentPost}", [CommentController::class, "destroy"]);
    Route::put("/comment/{commentPost}", [CommentController::class, "update"]);

    //upsanddowns
    Route::get("/upsanddowns", [UpsAndDownsController::class, "index"]);
    Route::post("/upsanddowns/student", [UpsAndDownsController::class, "storeStudent"])->middleware("studentRole");
    Route::post("/upsanddowns/teacher", [UpsAndDownsController::class, "storeTeacher"])->middleware("teacherRole");

    //kardex
    Route::get("/kardex", [KardexController::class, "index"]);
    Route::post("/kardex", [KardexController::class, "store"])->middleware("teacherRole");

    //periods
    Route::get("/periods", [PeriodController::class, "index"]);

    //teams
    Route::get("/teams", [TeamController::class, "index"]);

    //adminPeriods
    Route::put("/admin/periods/{period}", [PeriodController::class, "update"])
    ->middleware("/adminRole");
    Route::post("/admin/periods", [PeriodController::class, "create"])
    ->middleware("/adminRole");
    Route::delete("/admin/periods/{period}", [PeriodController::class, "destroy"])
    ->middleware("adminRole");

    //adminUsers
    Route::get("/admin/users", [AdminUserController::class, "index"])->middleware("adminRole");
    Route::get("/admin/students", [AdminUserController::class, "indexStudents"])->middleware("adminRole");
    Route::get("/admin/teachers", [AdminUserController::class, "indexTeachers"])->middleware("adminRole");
    Route::get("/admin/user/{user}/courses", [AdminUserController::class, "showCourses"])->middleware("adminRole");
    Route::put("/admin/user/{user}/courses", [AdminUserController::class, "updateStudentCourse"])->middleware("adminRole");

    //adminCourses
    Route::get("/admin/courses", [AdminCourseController::class, "index"])->middleware("adminRole");
    Route::post("/admin/courses", [AdminCourseController::class, "save"])->middleware("adminRole");
    Route::get("/admin/courses/{course}/students", [AdminCourseController::class, "studentsOfCourse"])
    ->middleware("adminRole");
    Route::put("/admin/courses/{course}/subject/{subject}", [AdminCourseController::class, "updateSubject"])
    ->middleware("adminRole");
    Route::put("/admin/courses/{course}/teacher/{user}", [AdminCourseController::class, "updateTeacher"])
    ->middleware("adminRole");
    Route::put("/admin/courses/{course}/team/{team}", [AdminCourseController::class, "updateTeam"])
    ->middleware("adminRole");
    Route::put("/admin/courses/{course}/period/{period}", [AdminCourseController::class, "updatePeriod"])
    ->middleware("adminRole");
    Route::put("/admin/courses/{course}/schedule", [AdminCourseController::class, "updateSchedule"])
    ->middleware("adminRole");
    Route::delete("/admin/courses/{course}", [AdminCourseController::class, "destroy"])
    ->middleware("adminRole");

    //adminCoursesStudied
    Route::put("/admin/courses/{courseStudied}/qualification", [AdminCourseStudiedController::class, "updateQualification"])
    ->middleware("adminRole");
    Route::post("/admin/courses/{user}/addop", [AdminCourseStudiedController::class, "addOpportunity"])
    ->middleware("adminRole");
    Route::post("/admin/courses/{course}/{user}", [AdminCourseStudiedController::class, "save"])
    ->middleware("adminRole");
    Route::delete("/admin/courses/{courseStudied}", [AdminCourseStudiedController::class, "destroy"])
    ->middleware("adminRole");

    //adminSubjects
    Route::get("/admin/subjects", [AdminSubjectController::class, "index"])
    ->middleware("adminRole");
    Route::post("/admin/subjects", [AdminSubjectController::class, "create"])
    ->middleware("adminRole");
    Route::put("/admin/subjects/{subject}", [AdminSubjectController::class, "update"])
    ->middleware("adminRole");
    Route::delete("/admin/subjects/{subject}", [AdminSubjectController::class, "destroy"])
    ->middleware("adminRole");
});

Route::post("/login", [AuthController::class, "login"]);
Route::post("/register", [AuthController::class, "register"]);

Route::get("/notices", [NoticesController::class, "index"]);
Route::get("/events", [EventsController::class, "index"]);
Route::get("/courses", [CourseController::class, "index"]);