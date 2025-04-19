<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Construction extends Model
{
    protected $fillable = [
        'title',
        'fiscalYear',
        'description',
        'startDate',
        'estimatedCompletionDate',
        'endDate',
        'status',
        'user_id',
        'created_at',
        'updated_at',
    ];


    public function user() {
        return $this->belongsTo(User::class);
    }

    public function equipments() {
        return $this->belongsToMany(Equipment::class, 'constructions_equipments', 'construction_id', 'equipment_id');
    }
}
