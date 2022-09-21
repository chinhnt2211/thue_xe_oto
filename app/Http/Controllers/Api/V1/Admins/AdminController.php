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
use App\Http\Resources\V1\StationResource;
use App\Models\Admin;
use App\Models\Station;
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

        if (in_array('location', $request->get('include'), true)) {
            $admins = $admins->with('location');
        }
        if (in_array('station', $request->get('include'), true)) {
            $admins = $admins->with('station');
        }
        $admins = $admins->paginate(10);
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
                    'current_page' => $admins->currentPage(),
                    'last_page' => $admins->lastPage(),
                ]
            ]
        ], 200);
    }


    /**
     * @param  ShowRequest  $request
     * @param  Admin  $admin
     * @return JsonResponse
     */

    public function show(ShowRequest $request, Admin $admin): JsonResponse
    {
        $result = $admin;
        if (in_array('location', $request->get('include'), true)) {
            $result = $admin->loadMissing('location');
        }

        if (in_array('station', $request->get('include'), true)) {
            $result = $admin->loadMissing('station');
        }
        return response()->json([
            'status' => true,
            'message' => 'Information admin',
            'data' => AdminResource::make($result)
        ], 201);
    }


    /**
     * @param  StoreRequest  $request
     * @return JsonResponse
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $admin = Admin::create(array_merge(
            $request->safe()->except(['cic_front', 'cic_back', 'avatar', 'location']),
            ['password' => bcrypt($request->validated('password'))]
        ));

        $admin->location()->create($request->validated('location'));

        $admin->images()->create([
            'link' => $request->validated('avatar'),
            'type' => ImageEnum::AVATAR,
        ]);
        $admin->images()->create([
            'link' => $request->validated('cic_front'),
            'type' => ImageEnum::CIC_FRONT,
        ]);
        $admin->images()->create([
            'link' => $request->validated('cic_back'),
            'type' => ImageEnum::CIC_BACK
        ]);

        return response()->json([
            'status' => true,
            'message' => 'Successfully station created',
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
        $admin->update($request->all());
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
