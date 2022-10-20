<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;


final class PaymentTypeEnum extends Enum
{
    public const PAY = 0;
    public const REFUND = 1;

    public static function getAllEnums(): array
    {
        return [
            'pay' => self::PAY,
            'refund' => self::REFUND,
        ];
    }
}
