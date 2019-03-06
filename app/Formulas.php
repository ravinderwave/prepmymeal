<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\OrdersMeals;
use App\Address;
use App\Customer;

class Formulas extends Model
{
    use SoftDeletes;

    protected $table = 'formulas';




}
