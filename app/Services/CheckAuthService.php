<?php

namespace App\Services;

use App\Enums\RoleEnum;

class CheckAuthService
{
    /**
     * @return bool
     */
    public function checkAuthenticate(): bool
    {
        return auth()->check();
    }

    /**
     * @return bool
     */
    public function checkAuthorizedAdmin(): bool
    {
        if (!(auth()->user()->tokenCan('role:'.RoleEnum::SUPER_ADMIN) ||
            auth()->user()->tokenCan('role:'.RoleEnum::ADMIN))) {
            return false;
        }

        if (!(auth()->user()->role === RoleEnum::ADMIN ||
            auth()->user()->role === RoleEnum::SUPER_ADMIN)) {
            return false;
        }

        return true;
    }

    /**
     * @return bool
     */
    public function checkAuthorizedSuperAdmin(): bool
    {
        if (!auth()->user()->tokenCan('role:'.RoleEnum::SUPER_ADMIN)) {
            return false;
        }

        if (!(auth()->user()->role === RoleEnum::SUPER_ADMIN)) {
            return false;
        }

        return true;
    }
}
