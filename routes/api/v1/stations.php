<?php

use App\Http\Controllers\Api\V1\Stations\LocationStationController;
use App\Http\Controllers\Api\V1\Stations\StationController;
use Illuminate\Support\Facades\Route;

Route::name('stations.')
    ->group(function () {
        Route::get('/stations', [StationController::class, 'index'])->name('index');
        Route::get('/stations/{station}', [StationController::class, 'show'])->name('show');
        Route::post('/stations', [StationController::class, 'store'])->name('store');
        Route::match(['put', 'patch'], '/stations/{station}', [StationController::class, 'update'])->name('update');
        Route::delete('/stations/{station}', [StationController::class, 'destroy'])->name('destroy');

        Route::get('/stations/{station}/location', [LocationStationController::class, 'show'])->name('locations.show');
        Route::post('/stations/{station}/location', [LocationStationController::class, 'store'])->name('locations.store');
        Route::match(['put', 'patch'], '/stations/{station}/location', [LocationStationController::class, 'update'])->name('locations.update');
        Route::delete('/stations/{station}/location', [LocationStationController::class, 'destroy'])->name('locations.destroy');
    });
