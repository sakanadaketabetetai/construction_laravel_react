<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionTemplateItem extends Model
{
    protected $fillable = [
        'template_id',
        'field_name',
        'unit',
        'min_value',
        'max_value',
        'type',
        'created_at',
        'updated_at',
    ];

    public function inspectionTemplate()
    {
        return $this->belongsTo(InspectionTemplate::class, 'template_id');
    }
}
