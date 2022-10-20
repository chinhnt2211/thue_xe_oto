<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Locations\StoreLocationRequest;
use App\Http\Requests\V1\Locations\UpdateLocationRequest;
use App\Http\Resources\V1\LocationResource;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class LocationUserController extends Controller
{
    protected $userModel;

    /**
     * @param  User  $userModel
     */
    public function __construct(User $userModel)
    {
        $this->userModel = $userModel;
    }

    /**
     * @param  User  $user
     * @return JsonResponse
     */
    public function show(User $user): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information location of the user',
            'data' => LocationResource::make($user->location),
        ], 201);
    }


    /**
     * @param  User  $user
     * @param  StoreLocationRequest  $request
     * @return JsonResponse
     */
    public function store(User $user, StoreLocationRequest $request): JsonResponse
    {
        if($user->location === null){
            $user->location()->create($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Successfully created',
                'data' => LocationResource::make($user->location),
            ], 201);
        }

        return response()->json([
            'status' => false,
            'message' => 'An existing record',
            'data' => [],
        ]);
    }


    /**
     * @param  User  $user
     * @param  UpdateLocationRequest  $request
     * @return JsonResponse
     */
    public function update(User $user, UpdateLocationRequest $request): JsonResponse
    {
        $user->location()->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => LocationResource::make($user->location),
        ], 201);
    }


    /**
     * @param  User  $user
     * @return JsonResponse
     */
    public function destroy(User $user): JsonResponse
    {
        if(auth()->check()){
            $user->location()->delete();
            return response()->json([
                'status' => true,
                'message' => 'Successful Delete',
                'data' => [],
            ], 200);
        };
        return response()->json([
            "message" => "Unauthenticated"
        ],401);

    }

}
