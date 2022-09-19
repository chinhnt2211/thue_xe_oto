<?php

use App\Http\Controllers\Auth\V1\Admin\GetUserController;
use App\Http\Controllers\Auth\V1\Admin\LoginController;
use App\Http\Controllers\Auth\V1\Admin\LogoutController;
use App\Http\Controllers\Auth\V1\Admin\RegisterController;
use Illuminate\Support\Facades\Route;

Route::name('admins.')
    ->middleware('auth:sanctum')
    ->prefix('admin')
    ->group(function () {
        Route::post('/register', [RegisterController::class, 'register'])->name('register');
        Route::post('/login', [LoginController::class, 'login'])
            ->withoutMiddleware('auth:sanctum')
            ->name('login');
        Route::post('/logout', [LogoutController::class, 'logout'])
            ->name('logout');
        Route::post('/get-user', [GetUserController::class, 'getInfo'])
            ->name('getUser');

    });
