<?php

namespace App\Http\Controllers\Api\V1\Vehicles;

use App\Enums\ImageEnum;
use App\Enums\RoleEnum;
use App\Exceptions\ModelNotFoundException;
use App\Exceptions\UnauthenticatedException;
use App\Exceptions\UnauthorizedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Vehicles\IndexRequest;
use App\Http\Requests\V1\Vehicles\ShowRequest;
use App\Http\Requests\V1\Vehicles\StoreRequest;
use App\Http\Requests\V1\Vehicles\UpdateRequest;
use App\Http\Resources\V1\VehicleResource;
use App\Models\Brand;
use App\Models\Station;
use App\Models\Vehicle;
use App\Services\CheckAuthService;
use App\Services\ImageService;
use Illuminate\Http\JsonResponse;

class VehicleController extends Controller
{
    protected $checkAuthService;
    protected $imageService;

    /**
     * @param  Vehicle  $vehicleModel
     * @param  ImageService  $imageService
     */
    public function __construct(CheckAuthService $checkAuthService, ImageService $imageService)
    {
        $this->checkAuthService = $checkAuthService;
        $this->imageService = $imageService;
    }


    /**
     * @param  IndexRequest  $request
     * @return JsonResponse
     */
    public function index(IndexRequest $request): JsonResponse
    {
        $vehicles = Vehicle::filter($request->safe()->except(['brand', 'location']));

        if ($request->has('location')) {
            $stations = Station::filterByLocation($request->validated(['location']));
            $vehicles = $vehicles->whereBelongsTo($stations->get());
        }

        if ($request->has('brand')) {
            $brand = Brand::filter(['name' => $request->validated('brand')]);
            $vehicles = $vehicles->whereBelongsTo($brand->get());
        }

        $vehicles = $vehicles->orderBy('id', 'desc')->paginate(10);
        return response()->json([
            'state' => true,
            'message' => 'List of vehicles',
            'data' => VehicleResource::collection($vehicles),
            'links' => [
                'first_page_url' => $vehicles->url(1),
                'last_page_url' => $vehicles->url($vehicles->lastPage()),
                'next_page_url' => $vehicles->nextPageUrl(),
                'prev_page_url' => $vehicles->previousPageUrl(),
            ],
            'meta' => [
                'page' => [
                    'total' => $vehicles->total(),
                    'count' => $vehicles->count(),
                    'per_page' => $vehicles->perPage(),
                    'current_page' => $vehicles->currentPage(),
                    'last_page' => $vehicles->lastPage(),
                ]
            ]
        ], 200);
    }

    /**
     * @param  Vehicle  $vehicle
     * @param  ShowRequest  $request
     * @return JsonResponse
     */
    public function show(Vehicle $vehicle, ShowRequest $request): JsonResponse
    {
        $result = $vehicle;
        return response()->json([
            'status' => true,
            'message' => 'Information of the vehicle',
            'data' => VehicleResource::make($result),
        ], 200);
    }

    /**
     * @param  StoreRequest  $request
     * @return JsonResponse
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $vehicle = Vehicle::create($request->safe()->all());
        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => VehicleResource::make($vehicle),
        ], 201);
    }

    /**
     * @param  UpdateRequest  $request
     * @param  Vehicle  $vehicle
     * @return JsonResponse
     */
    public function update(UpdateRequest $request, Vehicle $vehicle): JsonResponse
    {
        $vehicle->update($request->safe()->all());
        return response()->json([
            'status' => true,
            'message' => 'Successfully updated',
            'data' => VehicleResource::make($vehicle),
        ], 200);
    }

    /**
     * @param  Vehicle  $vehicle
     * @return JsonResponse
     * @throws UnauthenticatedException
     * @throws UnauthorizedException
     */
    public function destroy(Vehicle $vehicle): JsonResponse
    {

        if ($this->checkAuthService->checkAuthenticate()) {
            if ($this->checkAuthService->checkAuthorizedAdmin()) {
                foreach ($vehicle->images as $image) {
                    $this->imageService->removeImage($image->name, 'vehicles');
                }
                $vehicle->images()->delete();
                $vehicle->delete();
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
