<?php

namespace App\Http\Controllers\Auth\V1\Admins;

use App\Enums\ImageEnum;
use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Auth\Admins\LoginRequest;
use App\Http\Resources\V1\AdminResource;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class AdminAuthController extends Controller
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
        $admin->tokens()->delete();
        if ($admin->role === 0) {
            $token = $admin->createToken('token', ['role:'.RoleEnum::SUPER_ADMIN])->plainTextToken;
        } else {
            $token = $admin->createToken('token', ['role:'.RoleEnum::ADMIN])->plainTextToken;
        }
        $avatar = $admin->images()->where('type', '=', ImageEnum::AVATAR)->value('link');
        return response()->json([
            'status' => true,
            'message' => 'Successfully logged',
            'data' => AdminResource::make($admin),
            'avatar' => $avatar,
            'access_token' => $token,
            'type_token' => 'Bearer'
        ], 200);
    }

    /**
     * @return JsonResponse
     */
    public function getInfo(): \Illuminate\Http\JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Get user information!',
            'data' => AdminResource::make(auth()->user())
        ], 200);
    }

    /**
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        auth()->user()->currentAccessToken()->delete();
        return response()->json([
            'status' => true,
            'message' => 'Logout successfully',
        ], 200);
    }
}
