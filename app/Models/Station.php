<?php

namespace App\Models;

use App\Exceptions\ModelNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Station
 *
 * @property int $id
 * @property string $name
 * @property string $phone
 * @property int $capacity
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Location|null $location
 * @method static \Database\Factories\StationFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Station filter($filters)
 * @method static \Illuminate\Database\Eloquent\Builder|Station filterByLocation($filters)
 * @method static \Illuminate\Database\Eloquent\Builder|Station newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Station newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Station query()
 * @method static \Illuminate\Database\Eloquent\Builder|Station whereCapacity($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Station whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Station whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Station whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Station wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Station whereUpdatedAt($value)
 * @mixin \Eloquent
 */
class Station extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'phone',
        'capacity',
        'created_at',
        'updated_at',
    ];

    public function location(): \Illuminate\Database\Eloquent\Relations\MorphOne
    {
        return $this->morphOne(Location::class, 'locatable');
    }

    public function scopeFilterByLocation($query, $filters)
    {
        return $query
            ->whereHas('location', function ($q) use ($filters) {
                $q
                    ->when(isset($filters['city']), function ($q) use ($filters) {
                        $q->where('city', 'like', "%{$filters['city']}%");
                    })
                    ->when(isset($filters['district']), function ($q) use ($filters) {
                        $q->where('district', 'like', "%{$filters['district']}%");
                    })
                    ->when(isset($filters['ward']), function ($q) use ($filters) {
                        $q->where('ward', 'like', "%{$filters['ward']}%");
                    });
            });

    }


    public function scopeFilter($query, $filters)
    {
        return $query
            ->when(isset($filters['name']), function ($q) use ($filters) {
                $q->where('name', 'like', "%{$filters['name']}%");
            })
            ->when(isset($filters['min_capacity']), function ($q) use ($filters) {
                $q->where('capacity', '>=', "{$filters['min_capacity']}");
            })
            ->when(isset($filters['max_capacity']), function ($q) use ($filters) {
                $q->where('capacity', '<=', "{$filters['max_capacity']}");
            });

    }
}
