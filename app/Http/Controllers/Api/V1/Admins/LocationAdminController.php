<?php

namespace App\Http\Controllers\Api\V1\Admins;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Admins\UpdateLocationRequest;
use App\Http\Resources\V1\LocationResource;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;

class LocationAdminController extends Controller
{
    protected $adminModel;

    /**
     * @param  Admin  $adminModel
     */
    public function __construct(Admin $adminModel)
    {
        $this->adminModel = $adminModel;
    }

    /**
     * @param  Admin  $admin
     * @return JsonResponse
     */
    public function show(Admin $admin): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information location of the admin',
            'data' => LocationResource::make($admin->location),
        ], 201);
    }

    /**
     * @param  Admin  $admin
     * @param  UpdateLocationRequest  $request
     * @return JsonResponse
     */
    public function update(Admin $admin, UpdateLocationRequest $request): JsonResponse
    {
        $admin->location()->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => LocationResource::make($admin->location),
        ], 201);
    }

}
