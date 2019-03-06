<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Component extends Model
{
    use SoftDeletes;

    public $appends = ['ntr_options_obj'];


    public function getNtrOptionsArrayAttribute($value)
    {
        $data = [];
        if (json_decode($this->ntr_options)) {
            foreach (json_decode($this->ntr_options) as $row) {
                $data[] = (array)$row;
            }
        }
        return $data;
    }

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
