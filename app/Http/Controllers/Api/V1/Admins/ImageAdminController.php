<?php

namespace App\Http\Controllers\Api\V1\Admins;

use App\Enums\ImageEnum;
use App\Exceptions\ImageException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Images\StoreRequest;
use App\Http\Resources\V1\ImageResource;
use App\Models\Admin;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;

class ImageAdminController extends Controller
{
    protected $adminModel;
    protected $imageService;

    /**
     * @param  Admin  $adminModel
     * @param  ImageService  $imageService
     */
    public function __construct(Admin $adminModel, ImageService $imageService)
    {
        $this->adminModel = $adminModel;
        $this->imageService = $imageService;
    }

    /**
     * @param  Admin  $admin
     * @return JsonResponse
     */
    public function show(Admin $admin): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information images of the admin',
            'data' => ImageResource::collection($admin->images)
        ], 200);
    }

    /**
     * @param  Admin  $admin
     * @param  StoreRequest  $request
     * @return JsonResponse
     * @throws ImageException
     */
    public function store(Admin $admin, StoreRequest $request): JsonResponse
    {
        $images = $request->file('images');

        $fileNameAvatar = 'admins_'.ImageEnum::AVATAR.'_'.$admin->id.'-'.$images[0]->hashName();
        $fileNameCICFront = 'admins_'.ImageEnum::CIC_FRONT.'_'.$admin->id.'-'.$images[1]->hashName();
        $fileNameCICBack = 'admins_'.ImageEnum::CIC_BACK.'_'.$admin->id.'-'.$images[2]->hashName();

        if ($images[0]->isValid()) {
            $path = $this->imageService->uploadImage($images[0], 'admins', $fileNameAvatar);
            $admin->images()->create([
                'name' => $fileNameAvatar,
                'link' => $path,
                'type' => ImageEnum::AVATAR,
            ]);
        } else {
            throw  new ImageException('Validation images error', 400);
        }

        if ($images[1]->isValid()) {
            $path = $this->imageService->uploadImage($images[1], 'admins', $fileNameCICFront);
            $admin->images()->create([
                'name' => $fileNameCICFront,
                'link' => $path,
                'type' => ImageEnum::CIC_FRONT,
            ]);
        } else {
            throw  new ImageException('Validation images error', 400);
        }

        if ($images[2]->isValid()) {
            $path = $this->imageService->uploadImage($images[2], 'admins', $fileNameCICBack);
            $admin->images()->create([
                'name' => $fileNameCICBack,
                'link' => $path,
                'type' => ImageEnum::CIC_BACK,
            ]);
        } else {
            throw  new ImageException('Validation images error', 400);
        }

        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => ImageResource::collection($admin->images)
        ], 201);
    }

}
