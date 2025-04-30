<?php

namespace App\Interfaces;

interface WorkRecordRepositoryInterface
{
    public function createWorkRecord($work_log, array $work_records);
}
