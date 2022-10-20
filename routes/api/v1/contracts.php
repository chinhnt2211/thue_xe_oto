<?php

use App\Http\Controllers\Api\V1\Contracts\ContractController;
use App\Http\Controllers\Api\V1\Contracts\ImageContractController;
use Illuminate\Support\Facades\Route;

Route::name('contracts.')
    ->middleware(['auth:sanctum', 'role.admin'])
    ->group(function () {
        Route::get('/contracts', [ContractController::class, 'index'])
            ->withoutMiddleware(['role.superAdmin', 'role.admin'])
            ->name('index');
        Route::get('/contracts/{contract}', [ContractController::class, 'show'])
            ->name('show');
        Route::post('/contracts', [ContractController::class, 'store'])
            ->name('store');
        Route::match(['put', 'patch'], '/contracts/{contract}', [ContractController::class, 'update'])
            ->name('update');
        Route::post('/contracts/{contract}/payment', [ContractController::class, 'payment'])
            ->name('payment');


        /*Images 's Contract */
        Route::get('/contracts/{contract}/images', [ImageContractController::class, 'show'])
            ->name('images.show');
        Route::post('/contracts/{contract}/images', [ImageContractController::class, 'store'])
            ->name('images.store');
    });
