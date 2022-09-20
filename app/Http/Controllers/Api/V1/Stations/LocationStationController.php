<?php

namespace App\Http\Controllers\Api\V1\Stations;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Stations\StoreLocationRequest;
use App\Http\Requests\V1\Stations\UpdateLocationRequest;
use App\Http\Resources\V1\LocationResource;
use App\Models\Station;
use Illuminate\Http\JsonResponse;

class LocationStationController extends Controller
{
    protected $stationModel;

    /**
     * @param  Station  $stationModel
     */
    public function __construct(Station $stationModel)
    {
        $this->stationModel = $stationModel;
    }

    /**
     * @param  Station  $station
     * @return JsonResponse
     */
    public function show(Station $station): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information location of the station',
            'data' => LocationResource::make($station->location),
        ], 201);
    }


    /**
     * @param  Station  $station
     * @param  StoreLocationRequest  $request
     * @return JsonResponse
     */
    public function store(Station $station, StoreLocationRequest $request): JsonResponse
    {
        $station->location()->create($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => LocationResource::make($station->location),
        ], 201);
    }
    /**
     * @param  Station  $station
     * @param  UpdateLocationRequest  $request
     * @return JsonResponse
     */
    public function update(Station $station, UpdateLocationRequest $request): JsonResponse
    {
        $station->location()->update($request->all());

        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => LocationResource::make($station->location),
        ], 201);
    }

    /**
     * @param  Station  $station
     * @return JsonResponse
     */
    public function destroy(Station $station): JsonResponse
    {
        if(auth()->check()){
            $station->location()->delete();
            return response()->json([
                'status' => true,
                'message' => 'Successful Delete',
                'data' => [],
            ], 200);
        };
        return response()->json([
            "message" => "Unauthenticated"
        ],401);

    }
}
