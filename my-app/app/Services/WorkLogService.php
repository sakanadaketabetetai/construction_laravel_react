<?php

namespace App\Services;

use App\Interfaces\WorkLogRepositoryInterface;
use App\Interfaces\WorkRecordRepositoryInterface;
use App\Interfaces\WorkScheduleRepositoryInterface;
use Illuminate\Support\Facades\Auth;

class WorkLogService
{
    private $workLogRepository;
    private $workRecordRepository;
    private $workScheduleRepository;

    public function __construct(
        WorkLogRepositoryInterface $workLogRepository,
        WorkRecordRepositoryInterface $workRecordRepository,
        WorkScheduleRepositoryInterface $workScheduleRepository,
    ){
        $this->workLogRepository = $workLogRepository;
        $this->workRecordRepository = $workRecordRepository;
        $this->workScheduleRepository = $workScheduleRepository;
    }


    public function createWorkLog($work_log, $work_records, $work_schedules){
        $user_id = Auth::id();
        $work_log = $this->workLogRepository->createWorkLog($work_log, $user_id);
        $this->workRecordRepository->createWorkRecord($work_log,$work_records);
        $this->workScheduleRepository->createWorkSchedule($work_log,$work_schedules);
        return $work_log;
    }
}
