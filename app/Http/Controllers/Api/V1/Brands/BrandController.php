<?php

namespace App\Http\Controllers\Api\V1\Brands;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Brands\IndexRequest;
use App\Http\Requests\V1\Brands\ShowRequest;
use App\Http\Requests\V1\Brands\StoreRequest;
use App\Http\Requests\V1\Brands\UpdateRequest;
use App\Http\Resources\V1\BrandResource;
use App\Models\Brand;
use Illuminate\Http\JsonResponse;

class BrandController extends Controller
{
    protected $brandModel;

    /**
     * @param  Brand  $brandModel
     */
    public function __construct(Brand $brandModel)
    {
        $this->brandModel = $brandModel;
    }


    /**
     * @param  IndexRequest  $request
     * @return JsonResponse
     */
    public function index(IndexRequest $request): JsonResponse
    {
        $brands = Brand::filter($request->all());

        $brands = $brands->paginate(10);
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
                    'current_page' => $brands->currentPage(),
                    'last_page' => $brands->lastPage(),
                ]
            ]
        ], 200);
    }


    /**
     * @param  ShowRequest  $request
     * @param  Brand  $brand
     * @return JsonResponse
     */

    public function show(ShowRequest $request, Brand $brand): JsonResponse
    {

        return response()->json([
            'status' => true,
            'message' => 'Information brand',
            'data' => BrandResource::make($brand)
        ], 201);
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
            'message' => 'Successfully brand created',
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
     */
    public function destroy(Brand $brand): JsonResponse
    {
        if(auth()->check()){
            $brand->delete();
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
