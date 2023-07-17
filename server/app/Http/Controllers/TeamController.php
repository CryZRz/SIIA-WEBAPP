<?php

namespace App\Http\Controllers;

use App\Http\Resources\TeamResource;
use Illuminate\Http\Request;
use App\Models\Team;

class TeamController extends Controller
{
    public function index(){
        $teams = Team::paginate(10);

        return TeamResource::collection($teams);
    }
}
