<?php

namespace App\Http\Controllers\Api\V1\Admins;

use App\Enums\ImageEnum;
use App\Enums\RoleEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Admins\IndexRequest;
use App\Http\Requests\V1\Admins\ShowRequest;
use App\Http\Requests\V1\Admins\StoreRequest;
use App\Http\Requests\V1\Admins\UpdateRequest;
use App\Http\Resources\V1\AdminResource;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;

class AdminController extends Controller
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
     * @param  IndexRequest  $request
     * @return JsonResponse
     */
    public function index(IndexRequest $request): JsonResponse
    {
        $admins = Admin::filter($request->all());

        if ($request->has('location')) {
            $location = $request->get('location');
            $admins = $admins->filterByLocation($location);
        }

        $admins = $admins->orderBy('id', 'desc')->paginate(10);
        return response()->json([
            'state' => true,
            'message' => 'List of admins',
            'data' => AdminResource::collection($admins),
            'links' => [
                'first_page_url' => $admins->url(1),
                'last_page_url' => $admins->url($admins->lastPage()),
                'next_page_url' => $admins->nextPageUrl(),
                'prev_page_url' => $admins->previousPageUrl(),
            ],
            'meta' => [
                'page' => [
                    'total' => $admins->total(),
                    'count' => $admins->count(),
                    'per_page' => $admins->perPage(),
                    'current_page' => $admins->currentPage(),
                    'last_page' => $admins->lastPage(),
                ]
            ]
        ], 200);
    }


    /**
     * @param  Admin  $admin
     * @return JsonResponse
     */

    public function show(Admin $admin): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information admin',
            'data' => AdminResource::make($admin)
        ], 200);
    }


    /**
     * @param  StoreRequest  $request
     * @return JsonResponse
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $admin = Admin::create(array_merge(
            $request->safe()->except(['password']),
            ['password' => bcrypt($request->validated('password'))]
        ));

        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => AdminResource::make($admin->loadMissing(['location', 'station', 'images']))
        ], 201);
    }


    /**
     * @param  Admin  $admin
     * @param  UpdateRequest  $request
     * @return JsonResponse
     */
    public function update(Admin $admin, UpdateRequest $request): JsonResponse
    {
        $admin->update(array_merge(
            $request->safe()->except(['password']),
            ['password' => bcrypt($request->validated('password'))]
        ));
        return response()->json([
            'status' => true,
            'message' => 'Successfully updated',
            'data' => AdminResource::make($admin),
        ], 200);
    }

    /**
     * @param  Admin  $admin
     * @return JsonResponse
     */
    public function destroy(Admin $admin): JsonResponse
    {
        if (auth()->check() && auth()->user()->tokenCan('role:'.RoleEnum::SUPER_ADMIN)) {
            $admin->delete();
            return response()->json([
                'status' => true,
                'message' => 'Successful Delete',
                'data' => [],
            ], 200);
        };
        return response()->json([
            "message" => "Unauthenticated"
        ]);
    }

}
