<?php

use App\Http\Controllers\Api\V1\Brands\BrandController;
use Illuminate\Support\Facades\Route;

Route::name('brands.')
    ->middleware(['auth:sanctum', 'role.admin'])
    ->group(function () {
        Route::get('/brands', [BrandController::class, 'index'])
            ->withoutMiddleware(['auth:sanctum', 'role.admin'])
            ->name('index');
        Route::get('/brands/{brand}', [BrandController::class, 'show'])
            ->withoutMiddleware(['auth:sanctum', 'role.admin'])
            ->name('show');
        Route::post('/brands', [BrandController::class, 'store'])
            ->name('store');
        Route::match(['put', 'patch'], '/brands/{brand}', [BrandController::class, 'update'])
            ->name('update');
        Route::delete('/brands/{brand}', [BrandController::class, 'destroy'])
            ->name('destroy');
    });
