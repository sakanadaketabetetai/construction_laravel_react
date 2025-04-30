<?php

namespace App\Interfaces;

interface ApproveReportRepositoryInterface
{
    public function createApproveReport($approve_item_ids, $report_id);
}
