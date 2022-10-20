<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;

class ImageService
{
    /**
     * @param  UploadedFile  $image
     * @param  string  $dir
     * @param  string  $filename
     * @return false|string
     */
    public function uploadImage(UploadedFile $image, string $dir, string $filename = ''): bool|string
    {
        $storageUrl = 'http://'.env('SERVER_HOST').':'.env('SERVER_PORT').'/storage/'.$dir.'/';
        $image->storeAs('public/'.$dir, $filename);
        return $storageUrl.$filename;
    }

    public function removeImage(string $filename, string $dir): bool
    {
        return Storage::disk('local')->delete('public/'.$dir.'/'.$filename);
    }
}
