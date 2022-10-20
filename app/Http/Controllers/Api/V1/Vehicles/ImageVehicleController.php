<?php

namespace App\Http\Controllers\Api\V1\Vehicles;

use App\Enums\ImageEnum;
use App\Exceptions\ImageException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Images\StoreRequest;
use App\Http\Resources\V1\ImageResource;
use App\Models\Vehicle;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;

class ImageVehicleController extends Controller
{
    protected $vehicleModel;
    protected $imageService;

    /**
     * @param  Vehicle  $vehicleModel
     * @param  ImageService  $imageService
     */
    public function __construct(Vehicle $vehicleModel, ImageService $imageService)
    {
        $this->vehicleModel = $vehicleModel;
        $this->imageService = $imageService;
    }

    /**
     * @param  Vehicle  $vehicle
     * @return JsonResponse
     */
    public function show(Vehicle $vehicle): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information images of the vehicle',
            'data' => ImageResource::collection($vehicle->images)
        ], 200);
    }

    /**
     * @param  Vehicle  $vehicle
     * @param  StoreRequest  $request
     * @return JsonResponse
     * @throws ImageException
     */
    public function store(Vehicle $vehicle, StoreRequest $request): JsonResponse
    {
        foreach ($request->file('images') as $image) {
            if ($image->isValid()) {
                $filename = 'vehicles_'.$vehicle->id.'-'.$image->hashName();
                $path = $this->imageService->uploadImage($image, 'vehicles', $filename);
                $vehicle->images()->create([
                    'name' => $filename,
                    'link' => $path,
                    'type' => ImageEnum::VEHICLE_IMAGE,
                ]);
            } else {
                throw  new ImageException('Validation images error', 400);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => ImageResource::collection($vehicle->images)
        ], 201);
    }


}
