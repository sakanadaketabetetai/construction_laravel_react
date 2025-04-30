<?php

namespace App\Interfaces;

interface WorkScheduleRepositoryInterface
{
    public function createWorkSchedule($work_log, array $work_schedules);
}
