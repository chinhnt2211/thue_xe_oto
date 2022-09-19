<?php

namespace App\Http\Controllers\Auth\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\V1\AdminResource;

class GetUserController extends Controller
{
    public function getInfo()
    {
        return response()->json([
            'status' => true,
            'message' => 'Get user information!',
            'data' => AdminResource::make(auth()->user())
        ]);
    }
}
