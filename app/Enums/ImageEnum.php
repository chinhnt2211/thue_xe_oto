<?php declare(strict_types=1);

namespace App\Enums;

use BenSampo\Enum\Enum;

final class ImageEnum extends Enum
{
    public const AVATAR = 'avatar';
    public const CIC_FRONT = 'cic_front';
    public const CIC_BACK = 'cic_back';
    public const VEHICLE_IMAGE = 'vehicle_image';
    public const CONTRACT_IMAGE = 'contact_image';

}
