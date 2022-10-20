<?php

namespace App\Http\Controllers\Api\V1\Stations;

use App\Exceptions\UnauthenticatedException;
use App\Exceptions\UnauthorizedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Stations\IndexRequest;
use App\Http\Requests\V1\Stations\StoreRequest;
use App\Http\Requests\V1\Stations\UpdateRequest;
use App\Http\Resources\V1\StationResource;
use App\Models\Station;
use App\Services\CheckAuthService;
use Illuminate\Http\JsonResponse;

class StationController extends Controller
{
    protected $stationModel;
    protected $checkAuthService;

    /**
     * @param  Station  $stationModel
     * @param  CheckAuthService  $checkAuthService
     */
    public function __construct(Station $stationModel, CheckAuthService $checkAuthService)
    {
        $this->stationModel = $stationModel;
        $this->checkAuthService = $checkAuthService;
    }


    /**
     * @param  IndexRequest  $request
     * @return JsonResponse
     */
    public function index(IndexRequest $request): JsonResponse
    {
        $stations = Station::filter($request->all());

        if ($request->has('location')) {
            $stations = $stations->filterByLocation($request->validated('location'));
        }

        $stations = $stations->orderBy('id', 'desc')->paginate(10);
        return response()->json([
            'state' => true,
            'message' => 'List of stations',
            'data' => StationResource::collection($stations),
            'links' => [
                'first_page_url' => $stations->url(1),
                'last_page_url' => $stations->url($stations->lastPage()),
                'next_page_url' => $stations->nextPageUrl(),
                'prev_page_url' => $stations->previousPageUrl(),
            ],
            'meta' => [
                'page' => [
                    'total' => $stations->total(),
                    'count' => $stations->count(),
                    'per_page' => $stations->perPage(),
                    'current_page' => $stations->currentPage(),
                    'last_page' => $stations->lastPage(),
                ]
            ]
        ], 200);
    }


    /**
     * @param  Station  $station
     * @return JsonResponse
     */

    public function show(Station $station): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information station',
            'data' => StationResource::make($station)
        ], 200);
    }


    /**
     * @param  StoreRequest  $request
     * @return JsonResponse
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $station = Station::create($request->safe()->all());
        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => StationResource::make($station)
        ], 201);
    }


    /**
     * @param  Station  $station
     * @param  UpdateRequest  $request
     * @return JsonResponse
     */
    public function update(Station $station, UpdateRequest $request): JsonResponse
    {
        $station->update($request->all());
        return response()->json([
            'status' => true,
            'message' => 'Successfully updated',
            'data' => StationResource::make($station),
        ], 200);
    }

    /**
     * @param  Station  $station
     * @return JsonResponse
     * @throws UnauthenticatedException
     * @throws UnauthorizedException
     */
    public function destroy(Station $station): JsonResponse
    {
        if ($this->checkAuthService->checkAuthenticate()) {
            if ($this->checkAuthService->checkAuthorizedAdmin()) {
                $station->delete();
                return response()->json([
                    'status' => true,
                    'message' => 'Successful deleted',
                    'data' => [],
                ], 200);
            }
            throw new UnauthorizedException('Unauthorized', 403);
        }
        throw new UnauthenticatedException("Unauthenticated", 401);
    }

}
