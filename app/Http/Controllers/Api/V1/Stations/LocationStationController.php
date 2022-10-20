<?php

namespace App\Http\Controllers\Api\V1\Stations;

use App\Exceptions\AnExistingRecord;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Locations\StoreLocationRequest;
use App\Http\Requests\V1\Locations\UpdateLocationRequest;
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
        ], 200);
    }


    /**
     * @param  Station  $station
     * @param  StoreLocationRequest  $request
     * @return JsonResponse
     * @throws AnExistingRecord
     */
    public function store(Station $station, StoreLocationRequest $request): JsonResponse
    {
        if ($station->location === null) {
            $location = $station->location()->create($request->all());

            return response()->json([
                'status' => true,
                'message' => 'Successfully created',
                'data' => LocationResource::make($location),
            ], 201);
        }

        throw new AnExistingRecord('An existing record', 400);
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
            'message' => 'Successfully updated',
            'data' => LocationResource::make($station->location),
        ], 200);
    }


}
