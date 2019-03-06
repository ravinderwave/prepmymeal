<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Address extends Model
{
    use SoftDeletes;

    protected $table = 'addresses';

    /**
     * Get customer of a address.
     */
    public function customer()
    {
        return $this->belongsTo('App\Customer');
    }
}
