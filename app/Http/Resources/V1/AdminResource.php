<?php

namespace App\Http\Resources\V1;

use App\Enums\ImageEnum;
use App\Enums\RoleEnum;
use Illuminate\Http\Resources\Json\JsonResource;


class AdminResource extends JsonResource
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
            'full_name' => $this->full_name,
            'email' => $this->email,
            'phone' => $this->phone,
            'cic_number' => $this->cic_number,
            'dob' => $this->dob,
            'gender' => $this->gender,
            'role' => $this->role,
            'status' => $this->status,
            'station' => new StationResource($this->station),
        ];
    }
}
