<?php

namespace App\Http\Controllers\Api\V1\Repairs;

use App\Enums\RepairEnum;
use App\Exceptions\UnauthenticatedException;
use App\Exceptions\UnauthorizedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Repairs\CompleteRepairRequest;
use App\Http\Requests\V1\Repairs\IndexRequest;
use App\Http\Requests\V1\Repairs\ShowRequest;
use App\Http\Requests\V1\Repairs\StoreRequest;
use App\Http\Requests\V1\Repairs\UpdateRequest;
use App\Http\Resources\V1\RepairResource;
use App\Models\Repair;
use App\Services\CheckAuthService;
use Carbon\Carbon;
use Illuminate\Http\JsonResponse;

class RepairController extends Controller
{

    protected $checkAuth;

    public function __construct(CheckAuthService $checkAuth)
    {
        $this->checkAuth = $checkAuth;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  IndexRequest  $request
     * @return JsonResponse
     */
    public function index(IndexRequest $request): JsonResponse
    {
        $repairs = Repair::filter($request->safe()->all());

        if (in_array('admin', $request->validated('include'), true)) {
            $repairs = $repairs->with('admin');
        }

        if (in_array('vehicle', $request->validated('include'), true)) {
            $repairs = $repairs->with('vehicle');
        }

        $repairs = $repairs->paginate(10);

        return response()->json([
            'state' => true,
            'message' => 'List of repairs',
            'data' => RepairResource::collection($repairs),
            'links' => [
                'first_page_url' => $repairs->url(1),
                'last_page_url' => $repairs->url($repairs->lastPage()),
                'next_page_url' => $repairs->nextPageUrl(),
                'prev_page_url' => $repairs->previousPageUrl(),
            ],
            'meta' => [
                'page' => [
                    'total' => $repairs->total(),
                    'count' => $repairs->count(),
                    'current_page' => $repairs->currentPage(),
                    'last_page' => $repairs->lastPage(),
                ]
            ]
        ], 200);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreRequest  $request
     * @return JsonResponse
     */
    public function store(StoreRequest $request): JsonResponse
    {
        $repair = Repair::create($request->safe()->all());
        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => RepairResource::make($repair->loadMissing(['admin', 'vehicle'])),
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  Repair  $repair
     * @param  ShowRequest  $request
     * @return JsonResponse
     */
    public function show(Repair $repair, ShowRequest $request): JsonResponse
    {
        $result = $repair;

        if (in_array('admin', $request->validated('include'), true)) {
            $result = $repair->loadMissing('admin');
        }
        if (in_array('vehicle', $request->validated('include'), true)) {
            $result = $repair->loadMissing('admin');
        }

        return response()->json([
            'status' => true,
            'message' => 'Information of the repair',
            'data' => RepairResource::make($result),
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateRequest  $request
     * @param  Repair  $repair
     * @return JsonResponse
     */
    public function update(UpdateRequest $request, Repair $repair): JsonResponse
    {
        $repair->update($request->safe()->all());
        return response()->json([
            'status' => true,
            'message' => 'Successfully updated',
            'data' => RepairResource::make($repair),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Repair  $repair
     * @return JsonResponse
     * @throws UnauthenticatedException|UnauthorizedException
     */
    public function destroy(Repair $repair): JsonResponse
    {
        if ($this->checkAuth->checkAuthenticate()) {
            throw new UnauthenticatedException('Unauthenticated', 401);
        }

        if ($this->checkAuth->checkAuthorizedAdmin()) {
            throw new UnauthorizedException('Unauthorized', 403);
        }

        $repair->delete();
        return response()->json([
            'status' => true,
            'message' => 'Successfully deleted',
            'data' => [],
        ], 200);
    }

    /**
     * @param  Repair  $repair
     * @return JsonResponse
     * @throws UnauthenticatedException | UnauthorizedException
     */
    public function allowRepair(Repair $repair): JsonResponse
    {
        if ($this->checkAuth->checkAuthenticate()) {
            throw new UnauthenticatedException('Unauthenticated', 401);
        }

        if ($this->checkAuth->checkAuthorizedAdmin()) {
            throw new UnauthorizedException('Unauthorized', 403);
        }

        $repair->update([
            'status' => RepairEnum::REPAIRING,
            'start_date' => Carbon::now()->format('Y-m-d'),
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Successfully accepted',
            'data' => RepairResource::make($repair)
        ]);
    }

    /**
     * @param  CompleteRepairRequest  $request
     * @param  Repair  $repair
     * @return JsonResponse
     * @throws UnauthorizedException
     */
    public function completeRepair(CompleteRepairRequest $request, Repair $repair): JsonResponse
    {
        if ($this->checkAuth->checkAuthorizedAdmin()) {
            throw new UnauthorizedException('Unauthorized', 403);
        }

        $repair->update([
            'status' => RepairEnum::REPAIRING,
            'fee' => $request->validated('fee'),
            'end_date' => Carbon::now()->format('Y-m-d'),
        ]);
        return response()->json([
            'status' => true,
            'message' => 'Successfully completed',
            'data' => RepairResource::make($repair)
        ]);
    }
}
