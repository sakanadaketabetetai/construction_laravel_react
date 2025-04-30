<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class WorkLog extends Model
{
    protected $fillable = [
        'title',
        'user_id',
        'diaryDate',
        'created_at',
        'updated_at',
    ];


    public function construction_through_work_records (){
        return $this->belongsToMany(Construction::class, 'work_records', 'work_log_id', 'construction_id')->withPivot('construction_id', 'work_log_id', 'work_detail', 'workingDate');
    }

    public function construction_through_work_schedules(){
        return $this->belongsToMany(Construction::class, 'work_schedules', 'work_log_id', 'construction_id')->withPivot('construction_id', 'work_log_id', 'work_detail', 'scheduleWorkDate');
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
