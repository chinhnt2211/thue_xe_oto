<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Enums\ImageEnum;
use App\Enums\RoleEnum;
use App\Exceptions\UnauthenticatedException;
use App\Exceptions\UnauthorizedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Users\IndexRequest;
use App\Http\Requests\V1\Users\ShowRequest;
use App\Http\Requests\V1\Users\StoreRequest;
use App\Http\Requests\V1\Users\UpdateRequest;
use App\Http\Resources\V1\UserResource;
use App\Models\Admin;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
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
     * @param  IndexRequest  $request
     * @return JsonResponse
     */
    public function index(IndexRequest $request): JsonResponse
    {
        $users = User::filter($request->all());

        if ($request->has('location')) {
            $location = $request->get('location');
            $users = $users->filterByLocation($location);
        }

        if (in_array('location', $request->get('include'), true)) {
            $users = $users->with('location');
        }
        if (in_array('station', $request->get('include'), true)) {
            $users = $users->with('station');
        }
        $users = $users->paginate(10);
        return response()->json([
            'state' => true,
            'message' => 'List of users',
            'data' => UserResource::collection($users),
            'links' => [
                'first_page_url' => $users->url(1),
                'last_page_url' => $users->url($users->lastPage()),
                'next_page_url' => $users->nextPageUrl(),
                'prev_page_url' => $users->previousPageUrl(),
            ],
            'meta' => [
                'page' => [
                    'total' => $users->total(),
                    'count' => $users->count(),
                    'current_page' => $users->currentPage(),
                    'last_page' => $users->lastPage(),
                ]
            ]
        ], 200);
    }


    /**
     * @param  ShowRequest  $request
     * @param  User  $user
     * @return JsonResponse
     */

    public function show(ShowRequest $request, User $user): JsonResponse
    {
        $result = $user;
        if (in_array('location', $request->get('include'), true)) {
            $result = $user->loadMissing('location');
        }

        return response()->json([
            'status' => true,
            'message' => 'Information user',
            'data' => UserResource::make($result)
        ], 201);
    }


    /**
     * @param  StoreRequest  $request
     * @return JsonResponse
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $user = User::create(array_merge(
            $request->safe()->except(['avatar', 'location']),
            ['password' => bcrypt($request->validated('password'))]
        ));

        if (in_array('location', $request->get('with'), true)) {
            $user->location()->create($request->validated('location'));
        }

        if (in_array('images', $request->get('with'), true)) {
            $user->images()->create([
                'link' => $request->validated('avatar'),
                'type' => ImageEnum::AVATAR,
            ]);
        }

        return response()->json([
            'status' => true,
            'message' => 'Successfully station created',
            'data' => UserResource::make($user->loadMissing(['location']))
        ], 201);
    }


    /**
     * @param  User  $user
     * @param  UpdateRequest  $request
     * @return JsonResponse
     */
    public function update(User $user, UpdateRequest $request): JsonResponse
    {
        $user->update($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Successfully updated',
            'data' => UserResource::make($user),
        ], 200);
    }

    /**
     * @param  User  $user
     * @return JsonResponse
     */
    public function destroy(User $user): JsonResponse
    {
        if (!auth()->check()) {
            throw new UnauthenticatedException('Unauthenticated', 401);
            if (!(auth()->user()->tokenCan('role:'.RoleEnum::SUPER_ADMIN) ||
                auth()->user()->tokenCan('role:'.RoleEnum::ADMIN))) {
                throw new UnauthorizedException('Unauthenticated', 403);
            }
        }
        $user->delete();
        return response()->json([
            'status' => true,
            'message' => 'Successful Delete',
            'data' => [],
        ], 200);
    }

}
