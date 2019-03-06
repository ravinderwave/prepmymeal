<?php

namespace App;

use function Clue\StreamFilter\fun;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\OrdersMeals;
use App\Address;
use App\Customer;

class Transaction extends Model
{
    use SoftDeletes;
    protected $table = 'transaction';






}
