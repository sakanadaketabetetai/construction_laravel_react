<?php

namespace App\Repositories;

use App\Interfaces\WorkScheduleRepositoryInterface;

class WorkScheduleRepository implements WorkScheduleRepositoryInterface 
{
    public function createWorkSchedule($work_log, array $work_schedules){
        $data = [];
        foreach ($work_schedules as $work_schedule){
            $data[] = [
                'construction_id' => $work_schedule['construction_id'],
                'work_log_id' => $work_log->id,
                'work_detail' => $work_schedule['work_detail'],
                'scheduleWorkDate' => $work_schedule['schedule_work_date'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        $work_log->construction_through_work_schedules()->attach($data);
    }
}
