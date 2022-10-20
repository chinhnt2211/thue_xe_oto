<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

/**
 * App\Models\User
 *
 * @property int $id
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property string $full_name
 * @property string $email
 * @property string|null $address_line_1
 * @property int|null $address_line_2
 * @property string $phone
 * @property string $password
 * @property string $dob
 * @property int $gender
 * @property int|null $avatar
 * @property int $status
 * @property string|null $remember_token
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @property-read \Illuminate\Database\Eloquent\Collection|\Laravel\Sanctum\PersonalAccessToken[] $tokens
 * @property-read int|null $tokens_count
 * @method static \Database\Factories\UserFactory factory(...$parameters)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Admin newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Admin query()
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereAddressLine1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereAddressLine2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereDob($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property string|null $cic_number
 * @property int $role
 * @property int|null $station_id
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Image[] $images
 * @property-read int|null $images_count
 * @property-read \App\Models\Location|null $location
 * @property-read \App\Models\Station|null $station
 * @method static \Illuminate\Database\Eloquent\Builder|Admin filter($filters)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin filterByLocation($filters)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereCicNumber($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereRole($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereStationId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Admin whereFullName($value)
 */
class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'id',
        'full_name',
        'email',
        'phone',
        'password',
        'cic_number',
        'dob',
        'gender',
        'role',
        'status',
        'station_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
    ];


    public function images(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function location(): \Illuminate\Database\Eloquent\Relations\MorphOne
    {
        return $this->morphOne(Location::class, 'locatable');
    }

    public function station(): \Illuminate\Database\Eloquent\Relations\BelongsTo
    {
        return $this->belongsTo(Station::class, 'station_id');
    }

    /**
     * @param $type
     * @return mixed|null
     */
    public function getImageLinkByType($type): mixed
    {
        return $this->images()->where('type', '=', $type)->value('link');
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
            ->when(isset($filters['full_name']), function ($q) use ($filters) {
                $q->where('full_name', 'like', "%{$filters['full_name']}%");
            })
            ->when(isset($filters['email']), function ($q) use ($filters) {
                $q->where('email', 'like', "%{$filters['email']}%");
            })
            ->when(isset($filters['cic_number']), function ($q) use ($filters) {
                $q->where('cic_number', 'like', "%{$filters['cic_number']}%");
            })
            ->when(isset($filters['role']), function ($q) use ($filters) {
                $q->where('role', '=', $filters['role']);
            });
    }
}
