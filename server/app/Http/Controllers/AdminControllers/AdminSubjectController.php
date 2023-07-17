<?php

namespace App\Http\Controllers\AdminControllers;

use App\Http\Controllers\Controller;
use App\Http\Resources\SubjectResource;
use App\Models\Subject;
use Illuminate\Http\Request;

class AdminSubjectController extends Controller
{
    public function index(){
        $subjects = Subject::paginate(10);

        return SubjectResource::collection($subjects);
    }

    public function create(Request $request){
        $this->validate($request, [
            "name" => ["required", "string"],
            "credits" => ["required", "numeric", "min:1"]
        ]);

        Subject::create([
            "name" => $request->name,
            "credits" => $request->credits
        ]);

        return response()->make(null, 204);
    }

    public function update(Subject $subject, Request $request){
        $this->validate($request, [
            "name" => ["required", "string"],
            "credits" => ["required", "numeric", "min:1"]
        ]);

        $subject->name = $request->name;
        $subject->credits = $request->credits;
        $subject->save();

        return response()->make(null, 204);
    }

    public function destroy(Subject $subject){
        $subject->delete();

        return response()->make(null, 204);
    }
}
