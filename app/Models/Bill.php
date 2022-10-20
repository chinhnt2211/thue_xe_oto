<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

/**
 * App\Models\Bill
 *
 * @property int $contract_id
 * @property int $admin_id
 * @property int $type
 * @property int $total
 * @property string $description
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @method static \Database\Factories\BillFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Bill newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Bill query()
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereContractId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereDescription($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereTotal($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereUpdatedAt($value)
 * @mixin \Eloquent
 * @method static \Illuminate\Database\Eloquent\Builder|Bill filter($filters)
 * @method static \Illuminate\Database\Eloquent\Builder|Bill whereAdminId($value)
 */
class Bill extends Model
{
    use HasFactory;

    protected $fillable = [
        'contract_id',
        'admin_id',
        'type',
        'total',
        'description',
        'created_at',
        'updated_at',
    ];

    public function scopeFilter($query, $filters): mixed
    {
        return $query
            ->when(isset($filters['admin_id']), function ($q) use ($filters) {
                $q->where('admin_id', '=', $filters['admin_id']);
            })
            ->when(isset($filters['contract_id']), function ($q) use ($filters) {
                $q->where('contract_id', '=', $filters['contract_id']);
            })
            ->when(isset($filters['type']), function ($q) use ($filters) {
                $q->where('type', '=', $filters['type']);
            })
            ->when(isset($filters['start_date']), function ($q) use ($filters) {
                $q->where('created_at', '>=', $filters['start_date']);
            })
            ->when(isset($filters['end_date']), function ($q) use ($filters) {
                $q->where('created_at', '<=', $filters['end_date']);
            });
    }
}
