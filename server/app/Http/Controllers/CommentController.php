<?php

namespace App\Http\Controllers;

use App\Http\Requests\CommentPostRequest;
use App\Models\CommentPost;
use Illuminate\Http\Request;

class CommentController extends Controller
{
    public function store(CommentPostRequest $request){
        $data = $request->validated();

        CommentPost::create([
            "comment" => $data["comment"],
            "post_id" => $data["postId"],
            "user_id" => $request->user()->id
        ]);
    }

    public function update(CommentPost $commentPost, CommentPostRequest $request){
        $this->authorize("delete", $commentPost);

        $data = $request->validated();

        $commentPost->comment = $data["comment"];
        $commentPost->updated_at = now();
        $commentPost->save();

        return response()->make(null, 203);
    }

    public function destroy(CommentPost $commentPost){
        $this->authorize("delete", $commentPost);

        $commentPost->delete();

        return response()->make(null, 203);
    }
}
