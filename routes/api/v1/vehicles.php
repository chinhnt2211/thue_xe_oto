<?php

use App\Http\Controllers\Api\V1\Vehicles\ImageVehicleController;
use App\Http\Controllers\Api\V1\Vehicles\VehicleController;

Route::name('vehicles')
    ->middleware(['auth:sanctum', 'role.admin'])
    ->group(function () {
        Route::get('/vehicles', [VehicleController::class, 'index'])
            ->withoutMiddleware(['auth:sanctum', 'role.admin'])
            ->name('index');
        Route::get('/vehicles/{vehicle}', [VehicleController::class, 'show'])
            ->withoutMiddleware(['auth:sanctum', 'role.admin'])
            ->name('show');
        Route::post('/vehicles', [VehicleController::class, 'store'])
            ->name('store');
        Route::match(['put', 'patch'],'/vehicles/{vehicle}', [VehicleController::class, 'update'])
            ->name('update');
        Route::delete('/vehicles/{vehicle}', [VehicleController::class, 'destroy'])
            ->name('destroy');

        /*Images 's Vehicle */
        Route::get('/vehicles/{vehicle}/images', [ImageVehicleController::class, 'show'])
            ->name('images.show');
        Route::post('/vehicles/{vehicle}/images', [ImageVehicleController::class, 'store'])
            ->name('images.store');
    });
