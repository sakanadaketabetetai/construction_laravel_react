<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentRecordItem extends Model
{
    protected $fillable = [
        'record_id',
        'template_item_id',
        'time',
        'value',
        'created_at',
        'updated_at',
    ];


    public function equipmentRecord()
    {
        return $this->belongsTo(EquipmentRecord::class, 'record_id');
    }
    
    public function templateItem()
    {
        return $this->belongsTo(InspectionTemplateItem::class, 'template_item_id');
    }
}
