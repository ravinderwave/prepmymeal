<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ComponentDetails extends Model
{

    protected $table = 'component_details';

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
