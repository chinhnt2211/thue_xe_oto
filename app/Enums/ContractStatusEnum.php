<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;


final class ContractStatusEnum extends Enum
{
    public const PROCESSING = 0;
    public const COMPLETED = 1;
    public const BROKEN = 2;

    /**
     * @return array
     */
    public static function getAllEnums(): array
    {
        return [
            'processing' => self::PROCESSING,
            'completed' => self::COMPLETED,
            'broken' => self::BROKEN,
        ];
    }
}
