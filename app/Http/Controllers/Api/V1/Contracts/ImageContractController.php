<?php

namespace App\Http\Controllers\Api\V1\Contracts;

use App\Enums\ImageEnum;
use App\Exceptions\ImageException;
use App\Http\Requests\V1\Contracts\UpdateImageRequest;
use App\Http\Requests\V1\Images\StoreRequest;
use App\Http\Resources\V1\ImageResource;
use App\Models\Contract;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;

class ImageContractController
{

    protected $contractModel;
    protected $imageService;

    /**
     * @param  Contract  $contractModel
     * @param  ImageService  $imageService
     */
    public function __construct(Contract $contractModel, ImageService $imageService)
    {
        $this->contractModel = $contractModel;
        $this->imageService = $imageService;
    }

    /**
     * @param  Contract  $contract
     * @return JsonResponse
     */
    public function show(Contract $contract): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information images of the contract',
            'data' => ImageResource::collection($contract->images)
        ], 200);
    }

    /**
     * @param  Contract  $contract
     * @param  StoreRequest  $request
     * @return JsonResponse
     * @throws ImageException
     */
    public function store(Contract $contract, StoreRequest $request): JsonResponse
    {
        foreach ($request->file('images') as $image) {
            if ($image->isValid()) {
                $filename = 'contracts_'.$contract->id.'-'.$image->hashName();
                $path = $this->imageService->uploadImage($image, 'contracts', $filename);
                $contract->images()->create([
                    'name' => $filename,
                    'link' => $path,
                    'type' => ImageEnum::CONTRACT_IMAGE,
                ]);
            } else {
                throw  new ImageException('Validation images error', 400);
            }
        }

        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => ImageResource::collection($contract->images)
        ], 201);
    }
}
