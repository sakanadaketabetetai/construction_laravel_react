<?php

namespace App\Interfaces;


interface WorkLogRepositoryInterface
{
    public function createWorkLog($work_log, $user_id);
    public function getWorkLogWithConstructions();
    public function getWorkLogByIdWithConstruction($id);
}
