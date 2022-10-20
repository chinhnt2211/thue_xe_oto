<?php

use App\Http\Controllers\Api\V1\Users\ImageUserController;
use App\Http\Controllers\Api\V1\Users\LocationUserController;
use App\Http\Controllers\Api\V1\Users\UserController;
use Illuminate\Support\Facades\Route;

Route::name('users.')
    ->middleware(['auth:sanctum', 'role.admin', 'role.superAdmin'])
    ->group(function () {
        Route::get('/users', [UserController::class, 'index'])
            ->withoutMiddleware(['auth:sanctum', 'role.admin', 'role.superAdmin'])
            ->name('index');
        Route::get('/users/{user}', [UserController::class, 'show'])
            ->withoutMiddleware(['auth:sanctum', 'role.admin', 'role.superAdmin'])
            ->name('show');
        Route::post('/users', [UserController::class, 'store'])->name('store');
        Route::match(['put', 'patch'], '/users/{user}', [UserController::class, 'update'])->name('update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('destroy');


        /*Location's User */
        Route::get('/users/{user}/location', [LocationUserController::class, 'show'])
            ->name('locations.show');
        Route::match(['put', 'patch'], '/users/{user}/location', [LocationUserController::class, 'update'])
            ->name('locations.update');
        Route::post('/users/{user}/location', [LocationUserController::class, 'store'])->name('locations.store');

        /*Images 's User */
        Route::get('/users/{user}/images', [ImageUserController::class, 'show'])
            ->name('images.show');
        Route::post('/users/{user}/images', [ImageUserController::class, 'store'])
            ->name('images.store');
        Route::match(['put', 'patch'], '/users/{user}/images', [ImageUserController::class, 'update'])
            ->name('images.update');
    });
