<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Contract
 *
 * @property int $id
 * @property int $user_id
 * @property int $admin_id
 * @property int $vehicle_id
 * @property string|null $full_name
 * @property string|null $cic_number
 * @property int $status
 * @property int $price
 * @property int|null $deposit_percent
 * @property string $start_date
 * @property string $end_date
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\ContractFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contract newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Contract query()
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereAdminId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCicNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereDepositPercent($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereEndDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereFullName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract wherePrice($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereStartDate($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereUserId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereVehicleId($value)
 * @mixin \Eloquent
 * @property string|null $first_name
 * @property string|null $last_name
 * @property int|null $paid
 * @method static \Illuminate\Database\Eloquent\Builder|Contract filter($filters)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract wherePaid($value)
 * @property string $phone
 * @property string|null $email
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Bill[] $bill
 * @property-read int|null $bill_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Image[] $images
 * @property-read int|null $images_count
 * @method static \Illuminate\Database\Eloquent\Builder|Contract whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Contract wherePhone($value)
 */
class Contract extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'user_id',
        'admin_id',
        'vehicle_id',
        'full_name',
        'phone',
        'email',
        'cic_number',
        'status',
        'price',
        'paid',
        'start_date',
        'end_date',
        'created_at',
        'updated_at'
    ];

    public function images(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function bill(): \Illuminate\Database\Eloquent\Relations\HasMany
    {
        return $this->hasMany(Bill::class);
    }

    /**
     * @param $query
     * @param $filters
     * @return mixed
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
            ->when(isset($filters['full_name']), function ($q) use ($filters) {
                $q->where('first_name', 'like', "%{$filters['first_name']}%");
            })
            ->when(isset($filters['cic_number']), function ($q) use ($filters) {
                $q->where('cic_number', 'like', "%{$filters['cic_number']}%");
            })
            ->when(isset($filters['status']), function ($q) use ($filters) {
                $q->where('status', '=', $filters['status']);
            })
            ->when(isset($filters['min_price']), function ($q) use ($filters) {
                $q->where('fee', '>=', $filters['min_fee']);
            })
            ->when(isset($filters['max_price']), function ($q) use ($filters) {
                $q->where('fee', '<=', $filters['max_fee']);
            })
            ->when(isset($filters['min_paid']), function ($q) use ($filters) {
                $q->where('fee', '>=', $filters['min_fee']);
            })
            ->when(isset($filters['max_paid']), function ($q) use ($filters) {
                $q->where('fee', '<=', $filters['max_fee']);
            })
            ->when(isset($filters['min_date']), function ($q) use ($filters) {
                $q->where('start_date', '>=', $filters['min_date']);
            })
            ->when(isset($filters['max_date']), function ($q) use ($filters) {
                $q->where('start_date', '<=', $filters['max_date']);
            });
    }
}
