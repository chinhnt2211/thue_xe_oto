<?php

use App\Http\Controllers\Auth\V1\Admins\AdminAuthController;
use Illuminate\Support\Facades\Route;

Route::name('auth.admins.')
    ->middleware(['auth:sanctum', 'role.admin'])
    ->prefix('admin')
    ->group(function () {
        Route::post('/login', [AdminAuthController::class, 'login'])
            ->withoutMiddleware(['auth:sanctum', 'role.admin'])
            ->name('login');
        Route::post('/logout', [AdminAuthController::class, 'logout'])
            ->name('logout');
        Route::post('/get-user', [AdminAuthController::class, 'getInfo'])
            ->name('getUser');
    });
