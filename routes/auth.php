<?php

use App\Helpers\Routes\RouteHelper;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


Route::prefix('v1')
    ->group(function () {
        RouteHelper::includeRouteFiles(__DIR__.'/auth/v1');
    });
