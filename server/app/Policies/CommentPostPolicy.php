<?php

namespace App\Policies;

use App\Models\CommentPost;
use App\Models\User;

class CommentPostPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function delete(User $user, CommentPost $commentPost): bool{
        return $user->id == $commentPost->user_id;
    }
}
