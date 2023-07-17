<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        "last_name",
        "direction",
        "team_id",
        "semester_id",
        "educational_plan_id",
        "role_id",
        "image",
        "profile_id"
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
        'password' => 'hashed',
    ];

    public function team(){
        return $this->belongsTo(Team::class);
    }

    public function profile(){
        return $this->belongsTo(Profile::class);
    }

    public function role(){
        return $this->belongsTo(Role::class);
    }

    public function semester(){
        return $this->belongsTo(Semester::class);
    }

    public function educationalPlan(){
        return $this->belongsTo(EducationalPlan::class);
    }
}
