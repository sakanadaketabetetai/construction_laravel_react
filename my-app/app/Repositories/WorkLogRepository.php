<?php

namespace App\Repositories;

use App\Interfaces\WorkLogRepositoryInterface;
use App\Models\WorkLog;

class WorkLogRepository implements WorkLogRepositoryInterface 
{
    public function createWorkLog($work_log, $user_id){
        return WorkLog::create([
            'title' => $work_log['title'],
            'diaryDate' => $work_log['diaryDate'],
            'user_id' => $user_id,
        ]);
    }

    public function getWorkLogWithConstructions()
    {
        $work_logs = WorkLog::with(['user','construction_through_work_records', 'construction_through_work_schedules'])->get();
        return $work_logs;
    }

    public function getWorkLogByIdWithConstruction($id)
    {
        $work_log = WorkLog::with(['user','construction_through_work_records', 'construction_through_work_schedules'])->find($id);
        return $work_log;
    }
}
