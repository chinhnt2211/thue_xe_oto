<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class UserStatusEnum extends Enum
{
    public const FORBIDDEN = 0;
    public const ACTIVE = 1;

    /**
     * @return array
     */
    public static function getAllEnums(): array
    {
        return [
            'forbidden' => self::FORBIDDEN,
            'active' => self::ACTIVE,
        ];
    }
}
