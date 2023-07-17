<?php

namespace App\Policies;

use App\Http\Helpers\Enums\RolesEnum;
use App\Models\Post;
use App\Models\User;

class PostPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function delete(User $user, Post $post): bool{
        return $user->id == $post->user_id || auth()->user()->role->name == RolesEnum::ADMIN->value;    
    }
}
