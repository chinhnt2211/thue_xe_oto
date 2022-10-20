<?php

namespace App\Http\Resources\V1;

use App\Enums\ImageEnum;
use App\Enums\RoleEnum;
use Illuminate\Http\Resources\Json\JsonResource;

class VehicleResource extends JsonResource
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
            'name' => $this->name,
            'seating_capacity' => $this->seating_capacity,
            'description' => $this->description,
            'license_number' => $this->license_number,
            'price' => $this->price,
            'rent_price' => $this->rent_price,
            'fine' => $this->fine,
            'brand' => new BrandResource($this->brand),
            'station' => new StationResource($this->station),
        ];
    }
}
