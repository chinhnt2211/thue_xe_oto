<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class RoleEnum extends Enum
{
    public const SUPER_ADMIN = 0;
    public const ADMIN = 1;
    public const USER = 2;

    public static function getAllEnums(): array
    {
        return [
            'admin' => self::ADMIN,
            'super_admin' => self::SUPER_ADMIN
        ];
    }
}
