<?php

namespace App\Http\Controllers\Api\V1\Brands;

use App\Exceptions\UnauthenticatedException;
use App\Exceptions\UnauthorizedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Brands\IndexRequest;
use App\Http\Requests\V1\Brands\StoreRequest;
use App\Http\Requests\V1\Brands\UpdateRequest;
use App\Http\Resources\V1\BrandResource;
use App\Models\Brand;
use App\Services\CheckAuthService;
use Illuminate\Http\JsonResponse;

class BrandController extends Controller
{
    protected $brandModel;
    protected $checkAuthService;

    /**
     * @param  Brand  $brandModel
     * @param  CheckAuthService  $checkAuthService
     */
    public function __construct(Brand $brandModel, CheckAuthService $checkAuthService)
    {
        $this->brandModel = $brandModel;
        $this->checkAuthService = $checkAuthService;

    }


    /**
     * @param  IndexRequest  $request
     * @return JsonResponse
     */
    public function index(IndexRequest $request): JsonResponse
    {
        $brands = Brand::filter($request->all());

        $brands = $brands->orderBy('id', 'desc')->paginate(10);
        return response()->json([
            'state' => true,
            'message' => 'List of Brands',
            'data' => BrandResource::collection($brands),
            'links' => [
                'first_page_url' => $brands->url(1),
                'last_page_url' => $brands->url($brands->lastPage()),
                'next_page_url' => $brands->nextPageUrl(),
                'prev_page_url' => $brands->previousPageUrl(),
            ],
            'meta' => [
                'page' => [
                    'total' => $brands->total(),
                    'count' => $brands->count(),
                    'per_page' => $brands->perPage(),
                    'current_page' => $brands->currentPage(),
                    'last_page' => $brands->lastPage(),
                ]
            ]
        ], 200);
    }


    /**
     * @param  Brand  $brand
     * @return JsonResponse
     */

    public function show(Brand $brand): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information of brand',
            'data' => BrandResource::make($brand)
        ], 200);
    }


    /**
     * @param  StoreRequest  $request
     * @return JsonResponse
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $brand = Brand::create($request->safe()->only(['name']));

        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => BrandResource::make($brand)
        ], 201);
    }


    /**
     * @param  Brand  $brand
     * @param  UpdateRequest  $request
     * @return JsonResponse
     */
    public function update(Brand $brand, UpdateRequest $request): JsonResponse
    {
        $brand->update($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Successfully updated',
            'data' => BrandResource::make($brand),
        ], 200);
    }

    /**
     * @param  Brand  $brand
     * @return JsonResponse
     * @throws UnauthenticatedException|UnauthorizedException
     */
    public function destroy(Brand $brand): JsonResponse
    {
        if ($this->checkAuthService->checkAuthenticate()) {
            if ($this->checkAuthService->checkAuthorizedAdmin()) {
                $brand->delete();
                return response()->json([
                    'status' => true,
                    'message' => 'Successfully deleted',
                    'data' => [],
                ], 200);
            }
            throw new UnauthorizedException('Unauthorized', 403);
        }
        throw new UnauthenticatedException("Unauthenticated", 401);
    }
}
