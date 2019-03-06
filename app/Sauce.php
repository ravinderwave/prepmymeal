<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Sauce extends Model
{

protected $table ='sauce';

    /**
     *
     * Get formulas of .components
     *
     */
    public function formula()
    {
        return $this->hasOne(Formulas::class, 'component_id', 'id');
    }


}
