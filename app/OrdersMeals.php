<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class OrdersMeals extends Model
{
    protected $table = 'orders_meals';

    public function order()
    {
     return   $this->hasMany(Order::class, 'id', 'orders_id');
    }

    public function meals()
    {
        return  $this->hasMany(Meal::class, 'id', 'meals_id');
    }
}
