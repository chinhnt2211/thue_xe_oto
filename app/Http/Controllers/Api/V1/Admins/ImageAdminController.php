<?php

namespace App\Http\Controllers\Api\V1\Admins;

use App\Enums\ImageEnum;
use App\Http\Controllers\Controller;
use App\Http\Requests\V1\Admins\UpdateImageRequest;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;

class ImageAdminController extends Controller
{
    protected $adminModel;

    /**
     * @param  Admin  $adminModel
     */
    public function __construct(Admin $adminModel)
    {
        $this->adminModel = $adminModel;
    }

    /**
     * @param  Admin  $admin
     * @return JsonResponse
     */
    public function show(Admin $admin): JsonResponse
    {
        return response()->json([
            'status' => true,
            'message' => 'Information location of the admin',
            'data' => [
                'avatar' => $admin->getImageLinkByType(ImageEnum::AVATAR),
                'cic_front' => $admin->getImageLinkByType(ImageEnum::CIC_FRONT),
                'cic_back' => $admin->getImageLinkByType(ImageEnum::CIC_BACK),
            ],
        ], 201);
    }

    /**
     * @param  Admin  $admin
     * @param  UpdateImageRequest  $request
     * @return JsonResponse
     */
    public function update(Admin $admin, UpdateImageRequest $request): JsonResponse
    {
        if($request->has('avatar')){
            $admin->images()->where('type', '=', ImageEnum::AVATAR)->update([
                'link' => $request->validated('avatar'),
            ]);
        }
        if($request->has('cic_front')){
            $admin->images()->where('type', '=', ImageEnum::CIC_FRONT)->update([
                'link' => $request->validated('cic_front'),
            ]);
        }
        if($request->has('cic_back')){
            $admin->images()->where('type', '=', ImageEnum::CIC_BACK)->update([
                'link' => $request->validated('cic_back'),
            ]);
        }
        return response()->json([
            'status' => true,
            'message' => 'Successfully created',
            'data' => [
                'avatar' => $admin->getImageLinkByType(ImageEnum::AVATAR),
                'cic_front' => $admin->getImageLinkByType(ImageEnum::CIC_FRONT),
                'cic_back' => $admin->getImageLinkByType(ImageEnum::CIC_BACK),
            ],
        ], 201);
    }

}
