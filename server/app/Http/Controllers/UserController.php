<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserUpdateRequest;
use App\Http\Resources\UserResource;
use App\Models\Profile;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class UserController extends Controller
{
    public function show(User $user){
        return new UserResource($user);
    }

    public function update(User $user, UserUpdateRequest $request){
        $this->authorize("update", $user);

        $data = $request->validated();
        $user->name = $data["name"];
        $user->last_name = $data["lastName"];
        $user->email = $data["email"];

        $profileUser = Profile::find($user->profile->id);
        $profileUser->description = array_key_exists("description", $data) ? $data["description"] : "";

        $profileUser->save();
        $user->save();

        return response()->make(null, 203);
    }

    public function updateImage(User $user, Request $request){
        $this->authorize("update", $user);

        $this->validate($request, [
            "image" => ["required", "mimes:png,jpg,jpeg"]
        ]);

        if ($user->image != "default.png") {
            $imagenPath = public_path("images/profiles"."/".$user->image);

            if (File::exists($imagenPath)) {
                unlink($imagenPath);
            }
        }

        $imagen = $request->file("image");
        $nameImage =  Str::uuid().".".$imagen->extension();
        $imageUpload = Image::make($imagen);
        $imageUpload->fit(1000, 1000);
        $postsPath = public_path("images/profiles")."/".$nameImage;
        $imageUpload->save($postsPath);

        $user->image = $nameImage;
        $user->save();

        return response()->make(null, 203);
    }
}
