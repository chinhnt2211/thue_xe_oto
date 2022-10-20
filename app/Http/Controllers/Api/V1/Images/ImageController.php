<?php

namespace App\Http\Controllers\Api\V1\Images;

use App\Enums\ImageEnum;
use App\Exceptions\ImageException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Images\UpdateRequest;
use App\Http\Resources\V1\ImageResource;
use App\Models\Image;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;

class ImageController extends Controller
{
    protected $imageModel;
    protected $imageService;

    /**
     * @param  Image  $imageModel
     * @param  ImageService  $uploadImageService
     */
    public function __construct(Image $imageModel, ImageService $imageService)
    {
        $this->imageModel = $imageModel;
        $this->imageService = $imageService;
    }

    /**
     * @param  Image  $image
     * @return JsonResponse
     */
    public function show(Image $image): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information image',
            'data' => ImageResource::collection($image)
        ], 200);
    }


    /**
     * @param  Image  $image
     * @param  UpdateRequest  $request
     * @return JsonResponse
     * @throws ImageException
     */
    public function update(Image $image, UpdateRequest $request): JsonResponse
    {

        $dir = explode('_', $image->name)[0];

        $this->imageService->removeImage($image->name, $dir);

        if ($request->file('image') !== null && $request->file('image')->isValid()) {
            $filename = explode('-', $image->name)[0].'-'.$request->file('image')->hashName();
            $path = $this->imageService->uploadImage($request->file('image'), $dir, $filename);
            $image->update([
                'link' => $path,
                'name' => $filename,
            ]);
        } else {
            throw  new ImageException('Validation images error', 400);
        }

        return response()->json([
            'status' => true,
            'message' => 'Successfully updated',
            'data' => ImageResource::make($image),
            'path' => $path
        ], 200);
    }

    /**
     * @param  Image  $image
     * @return JsonResponse
     */
    public function destroy(Image $image): JsonResponse
    {
        if ($image->type === ImageEnum::VEHICLE_IMAGE) {
            $this->imageService->removeImage($image->name, 'vehicles');
        }
        $image->delete();
        return response()->json([
            'status' => true,
            'message' => 'Successfully deleted',
            'data' => [],
        ], 200);
    }
}
