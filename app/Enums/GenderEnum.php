<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;


final class GenderEnum extends Enum
{
    public const MALE = 0;
    public const FEMALE = 1;

    public static function getAllEnums(): array
    {
        return [
            'male' => self::MALE,
            'female' => self::FEMALE
        ];
    }
}
