<?php

namespace App\Models;

use App\Exceptions\ModelNotFoundException;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Repair
 *
 * @property int $id
 * @property int $admin_id
 * @property int $vehicle_id
 * @property int $fee
 * @property string|null $start_date
 * @property string|null $end_date
 * @property string $description
 * @property int $status
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Admin $admin
 * @property-read \App\Models\Vehicle $vehicle
 * @method static \Database\Factories\RepairFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Repair filter($filters)
 * @method static \Illuminate\Database\Eloquent\Builder|Repair newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Repair newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Repair query()
 * @method static \Illuminate\Database\Eloquent\Builder|Repair whereAdminId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repair whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repair whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repair whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repair whereFee($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repair whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repair whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repair whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repair whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Repair whereVehicleId($value)
 * @mixin \Eloquent
 */
class Repair extends Model
{
    use HasFactory;


    protected $fillable = [
        'id',
        'admin_id',
        'vehicle_id',
        'fee',
        'start_date',
        'end_date',
        'description',
        'status',
        'created_at',
        'updated_at',
    ];

    /**
     * @return BelongsTo
     */
    public function admin(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Admin::class, 'admin_id');
    }

    /**
     * @return BelongsTo
     */
    public function vehicle(): BelongsTo
    {
        return $this->belongsTo(Vehicle::class, 'vehicle_id');
    }

    /**
     * @param $query
     * @param $filters
     * @return mixed
     * @throws ModelNotFoundException
     */
    public function scopeFilter($query, $filters): mixed
    {
        return $query
            ->when(isset($filters['admin_id']), function ($q) use ($filters) {
                $q->where('admin_id', '=', $filters['admin_id']);
            })
            ->when(isset($filters['vehicle_id']), function ($q) use ($filters) {
                $q->where('vehicle_id', '=', $filters['vehicle_id']);
            })
            ->when(isset($filters['min_fee']), function ($q) use ($filters) {
                $q->where('fee', '>=', $filters['min_fee']);
            })
            ->when(isset($filters['max_fee']), function ($q) use ($filters) {
                $q->where('fee', '<=', $filters['max_fee']);
            })
            ->when(isset($filters['min_date']), function ($q) use ($filters) {
                $q->where('start_date', '>=', $filters['min_date']);
            })
            ->when(isset($filters['max_date']), function ($q) use ($filters) {
                $q->where('start_date', '<=', $filters['max_date']);
            })
            ->when(isset($filters['status']), function ($q) use ($filters) {
                $q->where('status', '=', $filters['status']);
            });
    }

}
