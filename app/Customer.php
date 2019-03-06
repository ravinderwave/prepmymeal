<?php

namespace App;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Laravel\Cashier\Billable;

class Customer extends Authenticatable
{
	use Notifiable, SoftDeletes;
        use Billable;
    protected $guard = 'customer';

	/**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token'
    ];

    /**
     * Get orders of a customer.
     */
    public function orders()
    {
        return $this->hasMany('App\Order');
    }

    /**
     * Get addresses of a customer.
     */
    public function addresses()
    {
        return $this->hasMany('App\Address');
    }
}
