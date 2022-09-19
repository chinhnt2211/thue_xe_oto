<?php

namespace App\Http\Controllers\Auth\V1\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Auth\Admin\LoginRequest;
use App\Http\Resources\V1\AdminResource;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class LoginController extends Controller
{

    /**
     * @param  LoginRequest  $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function login(LoginRequest $request): \Illuminate\Http\JsonResponse
    {
        $request->authenticate();
        $admin = Admin::where('email', $request->safe()->email)->first();
        if ($admin->role === 0) {
            $token = $admin->createToken('token', ['role:super_admin'])->plainTextToken;
        } else {
            $token = $admin->createToken('token', ['role:admin'])->plainTextToken;
        }

        return response()->json([
            'status' => true,
            'message' => 'Login successfully',
            'data' => AdminResource::make($admin),
            'access_token' => $token,
            'type_token' => 'Bearer'
        ]);
    }
}
