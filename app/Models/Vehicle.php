<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Vehicle
 *
 * @property int $id
 * @property string $name
 * @property int $status
 * @property int $seating_capacity
 * @property string $description
 * @property string $license_number
 * @property int $price
 * @property int $rent_price
 * @property int $fine
 * @property int $station_id
 * @property int $brand_id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Brand $brand
 * @property-read \App\Models\Station $station
 * @method static \Database\Factories\VehicleFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle filter($filters)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle filterByLocation($filters)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle query()
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereBrandId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereFine($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereLicenseNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereRentPrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereSeatingCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereStationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Vehicle whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Image[] $images
 * @property-read int|null $images_count
 */
class Vehicle extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'seating_capacity',
        'description',
        'license_number',
        'price',
        'rent_price',
        'fine',
        'station_id',
        'brand_id'
    ];

    public function images(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function station(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Station::class);
    }

    public function brand(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }


    public function scopeFilter($query, $filters)
    {
        return $query
            ->when(isset($filters['name']), function ($q) use ($filters) {
                $q->where('name', 'like', "%{$filters['name']}%");
            })
            ->when(isset($filters['seating_capacity']), function ($q) use ($filters) {
                $q->where('seating_capacity', '=', "{$filters['seating_capacity']}");
            })
            ->when(isset($filters['max_rent_price']), function ($q) use ($filters) {
                $q->where('rent_price', '<=', "{$filters['max_rent_price']}");
            })
            ->when(isset($filters['min_rent_price']), function ($q) use ($filters) {
                $q->where('rent_price', '>=', "{$filters['min_rent_price']}");
            });

    }
}
