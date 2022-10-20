<?php

namespace App\Exceptions;

use Exception;

class PaymentFailedException extends Exception
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
