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
 * @property string $first_name
 * @property string $last_name
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
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAddressLine1($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAddressLine2($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereAvatar($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDob($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFirstName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGender($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereLastName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePhone($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @mixin \Eloquent
 * @property-read \Illuminate\Database\Eloquent\Collection|\App\Models\Image[] $images
 * @property-read int|null $images_count
 * @property-read \App\Models\Location|null $location
 * @method static \Illuminate\Database\Eloquent\Builder|User filter($filters)
 * @method static \Illuminate\Database\Eloquent\Builder|User filterByLocation($filters)
 */
class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'phone',
        'password',
        'dob',
        'gender',
        'status'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function images(): \Illuminate\Database\Eloquent\Relations\MorphMany
    {
        return $this->morphMany(Image::class, 'imageable');
    }

    public function location(): \Illuminate\Database\Eloquent\Relations\MorphOne
    {
        return $this->morphOne(Location::class, 'locatable');
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
            ->when(isset($filters['first_name']), function ($q) use ($filters) {
                $q->where('first_name', 'like', "%{$filters['first_name']}%");
            })
            ->when(isset($filters['last_name']), function ($q) use ($filters) {
                $q->where('last_name', 'like', "%{$filters['last_name']}%");
            })
            ->when(isset($filters['email']), function ($q) use ($filters) {
                $q->where('email', 'like', "%{$filters['email']}%");
            });
    }
}
