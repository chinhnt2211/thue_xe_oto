<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;


final class RepairEnum extends Enum
{
    public const PENDING = 0;
    public const REPAIRING = 1;
    public const REPAIRED = 2;

    public static function getAllEnums(): array
    {
        return [
            'pending' => self::PENDING,
            'repairing' => self::REPAIRING,
            'repaired' => self::REPAIRED
        ];
    }
}
