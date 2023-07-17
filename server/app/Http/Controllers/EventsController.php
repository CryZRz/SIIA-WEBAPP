<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;

class EventsController extends Controller
{
    public function index(){
        $events = Event::paginate(6);
        
        return response()->json($events);
    }
}
