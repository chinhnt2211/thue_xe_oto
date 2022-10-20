<?php

namespace App\Http\Controllers\Api\V1\Contracts;

use App\Enums\ImageEnum;
use App\Enums\PaymentTypeEnum;
use App\Exceptions\ModelNotFoundException;
use App\Exceptions\PaymentFailedException;
use App\Exceptions\UnauthenticatedException;
use App\Exceptions\UnauthorizedException;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Contracts\IndexRequest;
use App\Http\Requests\V1\Contracts\PaymentRequest;
use App\Http\Requests\V1\Contracts\StoreRequest;
use App\Http\Requests\V1\Contracts\UpdateRequest;
use App\Http\Resources\V1\BillResource;
use App\Http\Resources\V1\ContractResource;
use App\Models\Contract;
use App\Services\CheckAuthService;
use App\Services\PaymentService;
use Illuminate\Http\JsonResponse;

class ContractController extends Controller
{

    protected $checkAuthService;
    protected $paymentService;

    public function __construct(CheckAuthService $checkAuthService, PaymentService $paymentService)
    {
        $this->checkAuthService = $checkAuthService;
        $this->paymentService = $paymentService;
    }

    /**
     * Display a listing of the resource.
     *
     * @param  IndexRequest  $request
     * @return JsonResponse
     */
    public function index(IndexRequest $request): JsonResponse
    {
        $contracts = Contract::filter($request->safe()->all())
            ->orderBy('id', 'desc')
            ->paginate(10);
        return response()->json([
            'status' => true,
            'message' => 'List of contracts',
            'data' => ContractResource::collection($contracts),
            'links' => [
                'first_page_url' => $contracts->url(1),
                'last_page_url' => $contracts->url($contracts->lastPage()),
                'next_page_url' => $contracts->nextPageUrl(),
                'prev_page_url' => $contracts->previousPageUrl(),
            ],
            'meta' => [
                'page' => [
                    'total' => $contracts->total(),
                    'count' => $contracts->count(),
                    'per_page' => $contracts->perPage(),
                    'current_page' => $contracts->currentPage(),
                    'last_page' => $contracts->lastPage(),
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
        $contract = Contract::create($request->safe()->all());

        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => ContractResource::make($contract),
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  Contract  $contract
     * @return JsonResponse
     */
    public function show(Contract $contract): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information of the contract',
            'data' => ContractResource::make($contract),
        ], 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateRequest  $request
     * @param  Contract  $contract
     * @return JsonResponse
     */
    public function update(UpdateRequest $request, Contract $contract): JsonResponse
    {
        $contract->update($request->safe()->all());

        return response()->json([
            'status' => true,
            'message' => 'Successfully updated',
            'data' => ContractResource::make($contract),
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Contract  $contract
     * @return JsonResponse
     * @throws UnauthenticatedException | UnauthorizedException
     */
    public function destroy(Contract $contract): JsonResponse
    {
        if (!$this->checkAuthService->checkAuthenticate()) {
            throw new UnauthenticatedException('Unauthenticated', 401);
        }
        if (!$this->checkAuthService->checkAuthorizedAdmin()) {
            throw new UnauthorizedException('Unauthorized', 403);
        }

        $contract->delete();

        return response()->json([
            'status' => true,
            'message' => 'Successfully deleted',
            'data' => [],
        ], 200);
    }

    /**
     * @throws PaymentFailedException
     */
    public function payment(Contract $contract, PaymentRequest $request): JsonResponse
    {
        $bill = null;
        if ($request->validated('type') === PaymentTypeEnum::PAY) {
            $bill = $this->paymentService->pay($contract, $request->validated('total'));
        }

        if ($request->validated('type') === PaymentTypeEnum::REFUND) {
            $bill = $this->paymentService->refund($contract, $request->validated('total'));
        }

        if ($bill === null) {
            throw new PaymentFailedException('Payment Failed', 400);
        }
        return response()->json([
            'status' => true,
            'message' => 'Payment Successful',
            'data' => BillResource::make($bill),
        ]);
    }
}
