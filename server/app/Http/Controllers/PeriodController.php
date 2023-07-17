<?php

namespace App\Http\Controllers;

use App\Http\Resources\PeriodResource;
use App\Models\Period;
use Illuminate\Http\Request;

class PeriodController extends Controller
{
    public function index(){
        $periods = Period::paginate(10);
        
        return PeriodResource::collection($periods);
    }

    public function create(Request $request){
        $this->validate($request, [
            "name" => ["required", "string", "max:50", "min:1"],
            "startDate" => ["date", "after:today"],
            "endDate" => ["date", "after:today"],
            "typeOfPeriod" => ["required", "string", "max:50", "min:1"],
        ]);

        Period::create([
            "name" => $request->name,
            "start_date" => $request->startDate,
            "end_date" => $request->endDate,
            "type_of_period" => $request->typeOfPeriod,
        ]);


        return response()->make(null, 204);
    }

    public function update(Period $period, Request $request){
        $this->validate($request, [
            "name" => ["required", "string", "max:50", "min:1"],
            "startDate" => ["date", "after:today"],
            "endDate" => ["date", "after:today"],
            "typeOfPeriod" => ["required", "string", "max:50", "min:1"],
        ]);

        $period->name = $request->name;
        $period->start_date = $request->startDate;
        $period->end_date = $request->endDate;
        $period->type_of_period = $request->typeOfPeriod;
        $period->save();

        return response()->make(null, 204);
    }

    public function destroy(Period $period){
        $period->delete();

        return response()->make(null, 204);
    }
}
