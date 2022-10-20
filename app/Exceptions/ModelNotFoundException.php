<?php

namespace App\Exceptions;

use Exception;

class ModelNotFoundException extends Exception
{
    /**
     * @return void
     */
    public function report()
    {

    }

    public function render($request)
    {
        return response()->json([
            'status' => false,
            'message' => $this->getMessage(),
        ], $this->code);
    }
}
