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

    public function report(){
        return $this->hasMany(Report::class);
    }

    public function work_log_through_records(){
        return $this->belongsToMany(WorkLog::class, 'work_records', 'construction_id', 'work_log_id')->withPivot('construction_id', 'work_log_id', 'work_detail', 'workingDate');;
    }
    
    public function work_log_through_schedules(){
        return $this->belongsToMany(WorkLog::class, 'work_schedules', 'construction_id', 'work_log_id')->withPivot('construction_id', 'work_log_id', 'work_detail', 'scheduleWorkDate');;
    }
}
