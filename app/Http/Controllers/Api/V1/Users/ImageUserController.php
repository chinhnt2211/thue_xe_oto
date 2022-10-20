<?php

namespace App\Http\Controllers\Api\V1\Users;

use App\Enums\ImageEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Users\StoreImageRequest;
use App\Http\Requests\V1\Users\UpdateImageRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;

class ImageUserController extends Controller
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
            'message' => 'Information images of the admin',
            'data' => [
                'avatar' => $user->getImageLinkByType(ImageEnum::AVATAR),
            ],
        ], 201);
    }

    /**
     * @param  User  $user
     * @param  StoreImageRequest  $request
     * @return JsonResponse
     */
    public function store(User $user, StoreImageRequest $request): JsonResponse
    {
        if ($user->images === null) {
            $user->images()->create($request->all());
            return response()->json([
                'status' => true,
                'message' => 'Successfully created',
                'data' => [
                    'avatar' => $user->getImageLinkByType(ImageEnum::AVATAR),
                ],
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
     * @param  UpdateImageRequest  $request
     * @return JsonResponse
     */
    public function update(User $user, UpdateImageRequest $request): JsonResponse
    {
        $user->images()->where('type', '=', ImageEnum::AVATAR)->update([
            'link' => $request->validated('avatar'),
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => [
                'avatar' => $user->getImageLinkByType(ImageEnum::AVATAR),
            ],
        ], 201);
    }

}
