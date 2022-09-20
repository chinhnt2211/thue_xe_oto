<?php

namespace App\Http\Controllers\Api\V1\Stations;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Stations\IndexRequest;
use App\Http\Requests\V1\Stations\ShowRequest;
use App\Http\Requests\V1\Stations\StoreRequest;
use App\Http\Requests\V1\Stations\UpdateRequest;
use App\Http\Resources\V1\StationResource;
use App\Models\Station;
use Illuminate\Http\JsonResponse;

class StationController extends Controller
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
     * @param  IndexRequest  $request
     * @return JsonResponse
     */
    public function index(IndexRequest $request): JsonResponse
    {
        $stations = Station::filter($request->all());

        if ($request->has('location')) {
            $location = $request->get('location');
            $stations = $stations->filterByLocation($location);
        }

        if (in_array('location', $request->get('include'), true)) {
            $stations = $stations->with('location');
        }
        $stations = $stations->paginate(10);
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
                    'current_page' => $stations->currentPage(),
                    'last_page' => $stations->lastPage(),
                ]
            ]
        ], 200);
    }


    /**
     * @param  ShowRequest  $request
     * @param  Station  $station
     * @return JsonResponse
     */

    public function show(ShowRequest $request, Station $station): JsonResponse
    {
        $include = explode(",", $request->get('include'));
        $result = $station;
        if (in_array('location', $include, true)) {
            $result = $station->loadMissing('location');
        }
        return response()->json([
            'status' => true,
            'message' => 'Information station',
            'data' => StationResource::make($result)
        ], 201);
    }


    /**
     * @param  StoreRequest  $request
     * @return JsonResponse
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $with = explode(",", $request->get('with'));
        $station = Station::create($request->safe()->only(['name', 'phone', 'capacity']));
        if (in_array('location', $with, true)) {
            $location = $request->safe()->only(['location']);
            $station->location()->create($location['location']);
        }

        return response()->json([
            'status' => true,
            'message' => 'Successfully station created',
            'data' => StationResource::make($station->loadMissing('location'))
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
     */
    public function destroy(Station $station): JsonResponse
    {
        if(auth()->check()){
            $station->delete();
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
