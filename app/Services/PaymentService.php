<?php

namespace App\Services;

use App\Enums\BillTypeEnum;
use App\Exceptions\PaymentFailedException;
use App\Models\Contract;
use Illuminate\Database\Eloquent\Model;

class PaymentService
{
    /**
     * @param  Contract  $contract
     * @param  int  $total
     * @return Model
     * @throws PaymentFailedException
     */
    public function pay(Contract $contract, int $total): Model
    {

        if (($contract->paid + $total) > $contract->price) {
            throw new PaymentFailedException('Invalid amount', 401);
        }

        $paid = $contract->paid + $total;
        $contract->update(['paid' => $paid]);
        return $contract->bill()->create([
            'type' => BillTypeEnum::PAY,
            'total' => $total,
            'admin_id' => auth()->id(),
            'description' => 'Thanh toán thành công',
        ]);
    }

    /**
     * @param  Contract  $contract
     * @param  int  $total
     * @return Model
     */
    public function refund(Contract $contract, int $total): Model
    {
        return $contract->bill()->create([
            'type' => BillTypeEnum::REFUND,
            'total' => -$total,
            'admin_id' => auth()->id(),
            'description' => 'Hoàn trả thành công',
        ]);
    }
}
