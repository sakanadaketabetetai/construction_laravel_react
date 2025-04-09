<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{
    protected $fillable = [
        'name',
        'model',
        'serialNumber',
        'manufacturer',
        'status',
        'equipment_category_id',
        'created_at',
        'updated_at',
    ];

    public function equipmentCategory() {
        return $this->belongsTo(EquipmentCategory::class);
    }
}
