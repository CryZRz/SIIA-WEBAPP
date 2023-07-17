<?php

namespace App\Policies;

use App\Models\User;
use App\Http\Helpers\Enums\RolesEnum;

class UserPolicy
{
    /**
     * Create a new policy instance.
     */
    public function __construct()
    {
        //
    }

    public function update(User $user): bool{
        return $user->id == auth()->user()->id || auth()->user()->role->name == RolesEnum::ADMIN->value;
    }
}
