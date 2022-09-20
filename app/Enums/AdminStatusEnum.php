<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class AdminStatusEnum extends Enum
{
    public const WORKING = 0;
    public const ON_LEAVE = 1;
    public const QUIT_JOB = 2;

    public static function getAllEnums(): array
    {
        return [
            'working' => self::WORKING,
            'on_leave' => self::ON_LEAVE,
            'quit_job' => self::QUIT_JOB
        ];
    }
}
