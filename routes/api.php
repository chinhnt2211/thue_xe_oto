<?php

use App\Helpers\Routes\RouteHelper;
use App\Http\Controllers\Api\V1\Bills\BillController;
use App\Http\Controllers\Api\V1\Images\ImageController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::prefix('v1')
    ->namespace("App\Http\Controllers\Api\V1")
    ->group(function () {
        RouteHelper::includeRouteFiles(__DIR__.'/api/v1');
        RouteHelper::includeRouteFiles(__DIR__.'/auth/v1');


        Route::name('images')
            ->middleware(['auth:sanctum', 'role.admin'])
            ->group(function () {
                Route::post('images/{image}', [ImageController::class, 'update'])->name('update');
                Route::delete('images/{image}', [ImageController::class, 'destroy'])->name('destroy');
            });

        Route::name('bills')
            ->middleware(['auth:sanctum', 'role.admin'])
            ->group(function () {
                Route::get('bills', [BillController::class, 'index'])->name('index');
                Route::get('bills/{image}', [BillController::class, 'show'])->name('show');
            });
    });

//Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//    return $request->user();
//});
