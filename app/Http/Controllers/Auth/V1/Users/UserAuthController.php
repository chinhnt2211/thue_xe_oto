<?php

namespace App\Http\Controllers\Auth\V1\Users;

use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Auth\Users\LogoutRequest;
use App\Http\Requests\V1\Auth\Users\RegisterRequest;
use App\Http\Requests\V1\Auth\Users\LoginRequest;
use App\Http\Resources\V1\UserResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Validation\ValidationException;

class UserAuthController extends Controller
{
    /**
     * @param  LoginRequest  $request
     * @return JsonResponse
     * @throws ValidationException
     */
    public function login(LoginRequest $request): JsonResponse
    {
        $request->authenticate();
        $user = User::where('email', $request->safe()->email)->first();
        $token = $user->createToken('token', ['role:'.RoleEnum::USER])->plainTextToken;

        return response()->json([
            'status' => true,
            'message' => 'Login successfully',
            'data' => UserResource::make($user),
            'access_token' => $token,
            'type_token' => 'Bearer'
        ], 200);
    }

    /**
     * @param  RegisterRequest  $request
     * @return JsonResponse
     */
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = User::create(array_merge(
                $request->safe()->except('password'),
                ['password' => bcrypt($request->validated('password'))]
            )
        );
        $token = $user->createToken('token', ['role:'.RoleEnum::USER])->plainTextToken;
        return response()->json([
            'status' => true,
            'message' => 'Registered successfully',
            'data' => UserResource::make($user),
            'access_token' => $token,
            'type_token' => 'Bearer'
        ], 201);
    }

    /**
     * @return JsonResponse
     */
    public function getInfo(): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Get user information!',
            'data' => UserResource::make(auth()->user())
        ]);
    }

    /**
     * @return JsonResponse
     */
    public function logout(LogoutRequest $request): JsonResponse
    {
        if ($request->has('options') && $request->get('options') === 'all') {
            auth()->user()->tokens()->delete();
        } else {
            auth()->user()->currentAccessToken()->delete();
        }
        return response()->json([
            'status' => true,
            'message' => 'Logout successfully',
        ]);
    }
}
