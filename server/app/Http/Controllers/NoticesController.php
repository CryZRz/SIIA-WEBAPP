<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Notice;

class NoticesController extends Controller
{
    public function index(){
        $notices = Notice::paginate(6);
        return response()->json($notices);
    }
}
