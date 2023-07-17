<?php

namespace App\Http\Middleware;

use App\Http\Helpers\Enums\RolesEnum;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRoleStudent
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if($request->user()->role->name != RolesEnum::STUDENT->value){
            abort(403, "Only students");
        }

        return $next($request);
    }
}
