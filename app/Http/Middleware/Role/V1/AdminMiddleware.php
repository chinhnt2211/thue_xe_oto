<?php

namespace App\Http\Middleware\Role\V1;

use App\Enums\RoleEnum;
use Closure;
use Illuminate\Http\Request;

class AdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if (auth()->user()->tokenCan('role:'.RoleEnum::ADMIN)
            || auth()->user()->tokenCan('role:'.RoleEnum::SUPER_ADMIN)) {
            return $next($request);
        }
        return response()->json([
            'message' => 'Not Authorized'
        ], 401);
    }
}
