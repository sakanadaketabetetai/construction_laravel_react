<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InspectionTemplate extends Model
{
    protected $fillable = [
        'name',
        'description',
        'created_at',
        'updated_at',
    ];

    public function inspection_template_items(){
        return $this->hasMany(InspectionTemplateItem::class);
    }
}
