<?php

use App\Http\Controllers\Auth\V1\Users\UserAuthController;
use Illuminate\Support\Facades\Route;

Route::name('auth.users.')
    ->middleware(['auth:sanctum', 'role.user'])
    ->prefix('user')
    ->group(function () {
        Route::post('/register', [UserAuthController::class, 'register'])
            ->withoutMiddleware(['auth:sanctum', 'role.user'])
            ->name('register');

        Route::post('/login', [UserAuthController::class, 'login'])
            ->withoutMiddleware(['auth:sanctum', 'role.user'])
            ->name('login');

        Route::post('/logout', [UserAuthController::class, 'logout'])
            ->name('logout');

        Route::post('/get-user', [UserAuthController::class, 'getInfo'])
            ->name('getUser');
    });
