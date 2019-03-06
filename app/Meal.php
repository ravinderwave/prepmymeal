<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Meal extends Model
{
    use SoftDeletes;

    public function orderMeals()
    {
        $this->hasMany(OrdersMeals::class, 'meals_id', 'id');
    }

    public function getComponent($mealOption)
    {
        $mealOption = json_decode($mealOption, true);

        return Component::with('formula')->whereIn('id', array_values($mealOption))->get();

    }

}
