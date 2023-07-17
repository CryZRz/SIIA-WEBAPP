<?php

namespace App\Http\Helpers\Enums;

enum RolesEnum: string {
    case STUDENT = "student";
    case TEACHER = "teacher";
    case ADMIN = "admin";

}