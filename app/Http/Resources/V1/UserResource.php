<?php

namespace App\Http\Resources\V1;

use App\Enums\ImageEnum;
use App\Enums\RoleEnum;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'first_name' => $this->first_name,
            'last_name' => $this->last_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'avatar' => $this->getImageLinkByType(ImageEnum::AVATAR),
            $this->mergeWhen(auth()->check() && auth()->user()->role == RoleEnum::SUPER_ADMIN, [
                'location' => new LocationResource($this->whenLoaded('location')),
            ]),
            'dob' => $this->dob,
            'gender' => $this->gender,
            'status' => $this->status,
        ];
    }
}
