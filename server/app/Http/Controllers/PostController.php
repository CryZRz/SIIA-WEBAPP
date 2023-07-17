<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Http\Requests\PostUpdateRequest;
use App\Http\Resources\PostResouce;
use App\Models\Post;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Str;
use Intervention\Image\Facades\Image;

class PostController extends Controller
{
    public function index(){
        $posts = Post::paginate(10);
        
        return PostResouce::collection($posts);
    }

    public function store(PostRequest $request){
        $data = $request->validated();
        $imagen = $request->file("image");

        $nameImage =  Str::uuid().".".$imagen->extension();
        $imageUpload = Image::make($imagen);
        $imageUpload->fit(1000, 1000);

        $postsPath = public_path("images/posts")."/".$nameImage;
        $imageUpload->save($postsPath);

        Post::create([
            "title" => $data["title"],
            "image" => $nameImage,
            "user_id" => $request->user()->id
        ]);

        return response()->make(null, 203);
    }

    public function update(Post $post, PostUpdateRequest $request){
        $this->authorize("delete", $post);

        $data = $request->validated();

        if (array_key_exists("image", $data)) {
            $imagenPath = public_path("images/posts"."/".$post->image);

            if (File::exists($imagenPath)) {
                unlink($imagenPath);
            }

            $imagen = $request->file("image");
            $nameImage =  Str::uuid().".".$imagen->extension();
            $imageUpload = Image::make($imagen);
            $imageUpload->fit(1000, 1000);

            $postsPath = public_path("images/posts")."/".$nameImage;
            $imageUpload->save($postsPath);

            $post->title = $data["title"];
            $post->image = $nameImage;
            $post->updated_at = now();
            $post->save();

            return response()->make(null, 203);
        }

        $post->title = $data["title"];
        $post->updated_at = now();
        $post->save();
        return response()->make(null, 203);
    }

    public function destroy(Post $post){
        $this->authorize("delete", $post);

        $imagenPath = public_path("images/profiles"."/".$post->image);
        if (File::exists($imagenPath)) {
            unlink($imagenPath);
        }

        $post->comments()->delete();
        $post->delete();
        
        return response()->make(null, 203);
    } 
}
