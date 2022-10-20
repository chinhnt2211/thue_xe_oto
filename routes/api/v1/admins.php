<?php

use App\Http\Controllers\Api\V1\Admins\AdminController;
use App\Http\Controllers\Api\V1\Admins\ImageAdminController;
use App\Http\Controllers\Api\V1\Admins\LocationAdminController;
use Illuminate\Support\Facades\Route;

Route::name('admins.')
    ->middleware(['auth:sanctum', 'role.superAdmin'])
    ->group(function () {
        Route::get('/admins', [AdminController::class, 'index'])
            ->name('index');
        Route::get('/admins/{admin}', [AdminController::class, 'show'])
            ->name('show');
        Route::post('/admins', [AdminController::class, 'store'])
            ->name('store');
        Route::match(['put', 'patch'], '/admins/{admin}', [AdminController::class, 'update'])
            ->name('update');
        Route::delete('/admins/{admin}', [AdminController::class, 'destroy'])->name('destroy');

        /*Location's Admin */
        Route::get('/admins/{admin}/location', [LocationAdminController::class, 'show'])
            ->name('locations.show');
        Route::post('/admins/{admin}/location', [LocationAdminController::class, 'store'])
            ->name('locations.store');
        Route::match(['put', 'patch'], '/admins/{admin}/location', [LocationAdminController::class, 'update'])
            ->name('locations.update');

        /*Images 's Admin */
        Route::get('/admins/{admin}/images', [ImageAdminController::class, 'show'])
            ->name('images.show');
        Route::post('/admins/{admin}/images', [ImageAdminController::class, 'store'])
            ->name('images.show');
    });
