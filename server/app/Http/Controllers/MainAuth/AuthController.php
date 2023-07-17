<?php

namespace App\Http\Controllers\MainAuth;

use App\Http\Requests\MainLoginRequest;
use App\Http\Requests\MainRegisterRequest;
use App\Http\Resources\UserResource;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(MainLoginRequest $request){
        $data = $request->validated();

        if (!Auth::attempt($data)) {
            return response([
                "errors" => "El email o el password son incorrectos"
            ]);
        }

        $user = Auth::user();

        return [
            "token" => $user->createToken("token")->plainTextToken,
            "user" => new UserResource($user)
        ];
    }

    public function register(MainRegisterRequest $request){
        $data = $request->validated();

        $profile = Profile::create([
            "description" => null,
            "social_id" => null
        ]);

        if($data["role"] == 1){
            User::create([
                "name" => $data["name"],
                "last_name" => $data["lastName"],
                "email" => $data["email"],
                "password" => $data["password"],
                "direction" => $data["direction"],
                "team_id" => null,
                "semester_id" => null,
                "educational_plan_id" => null,
                "role_id" => $data["role"],
                "image" => "default.png",
                "profile_id" => $profile->id,
            ]);
        }else{
            User::create([
                "name" => $data["name"],
                "last_name" => $data["lastName"],
                "email" => $data["email"],
                "password" => $data["password"],
                "direction" => $data["direction"],
                "team_id" => 2,
                "semester_id" => 1,
                "educational_plan_id" => 1,
                "role_id" => $data["role"],
                "image" => "default.png",
                "profile_id" => $profile->id,
            ]);
        }
        

        return response()->make(null, 203);
    }

    public function user(Request $request){
        return new UserResource($request->user());
    }

    public function logout(Request $request){
        $user = $request->user();
        $user->currentAccessToken()->delete();

        return response()->make(null, 203);
    }
}
