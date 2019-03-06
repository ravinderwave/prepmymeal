<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\OrdersMeals;
use App\Address;
use App\Customer;

class Order extends Model
{
    use SoftDeletes;

    /**
     * Get customer of a order.
     */
    public function customer()
    {
        return $this->belongsTo(Customer::class);
    }

    /**
     *
     * Get address of a order.
     *
     */
    public function address()
    {
        return $this->belongsTo(Address::class);
    }

    /**
     *
     * Get details of a order.
     *
     */
    public function ordersMeals()
    {
        return $this->hasMany(OrdersMeals::class, 'orders_id', 'id');
    }


}
