<?php

namespace App\Repositories;

use App\Interfaces\WorkRecordRepositoryInterface;

class WorkRecordRepository implements WorkRecordRepositoryInterface 
{
    public function createWorkRecord($work_log, array $work_records){
        $data = [];
        foreach ($work_records as $work_record){
            $data[] = [
                'construction_id' => $work_record['construction_id'],
                'work_log_id' => $work_log->id,
                'work_detail' => $work_record['work_detail'],
                'workingDate' => $work_record['working_date'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        $work_log->construction_through_work_records()->attach($data);
    }
}
