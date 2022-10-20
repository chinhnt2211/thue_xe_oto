<?php

namespace App\Http\Controllers\Api\V1\Bills;

use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Bills\IndexRequest;
use App\Http\Resources\V1\AdminResource;
use App\Http\Resources\V1\BillResource;
use App\Models\Admin;
use App\Models\Bill;
use Illuminate\Http\JsonResponse;

class BillController extends Controller
{
    protected $billModel;

    /**
     * @param  Admin  $adminModel
     */
    public function __construct(Bill $billModel)
    {
        $this->billModel = $billModel;
    }


    /**
     * @param  IndexRequest  $request
     * @return JsonResponse
     */
    public function index(IndexRequest $request): JsonResponse
    {


        $bill = Bill::filter($request->all())->orderBy('created_at', 'desc')->paginate(10);
        return response()->json([
            'state' => true,
            'message' => 'List of bills',
            'data' => BillResource::collection($bill),
            'links' => [
                'first_page_url' => $bill->url(1),
                'last_page_url' => $bill->url($bill->lastPage()),
                'next_page_url' => $bill->nextPageUrl(),
                'prev_page_url' => $bill->previousPageUrl(),
            ],
            'meta' => [
                'page' => [
                    'total' => $bill->total(),
                    'count' => $bill->count(),
                    'per_page' => $bill->perPage(),
                    'current_page' => $bill->currentPage(),
                    'last_page' => $bill->lastPage(),
                ]
            ]
        ], 200);
    }


    /**
     * @param  Bill  $bill
     * @return JsonResponse
     */

    public function show(Bill $bill): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information bill',
            'data' => BillResource::make($bill)
        ], 200);
    }

}
