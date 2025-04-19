<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class EquipmentRecord extends Model
{
    protected $fillable = [
        'equipment_id',
        'template_id',
        'recorded_at',
        'created_by_id',
        'start_time',
        'end_time',
        'notes',
        'created_at',
        'updated_at',
    ];

    public function equipment(){
        return $this->belongsTo(Equipment::class);
    }

    public function template(){
        return $this->belongsTo(Equipment::class);
    }

    public function user(){
        return $this->belongsTo(User::class, 'created_by_id');
    }
}
