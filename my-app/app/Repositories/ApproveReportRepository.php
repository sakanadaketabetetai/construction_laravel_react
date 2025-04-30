<?php

namespace App\Repositories;
use App\Interfaces\ApproveReportRepositoryInterface;
use App\Models\Report;

class ApproveReportRepository implements ApproveReportRepositoryInterface 
{
    public function createApproveReport($approve_item_ids, $report_id)
    {
        $report = Report::find($report_id);
    
        $data = [];
        foreach ($approve_item_ids as $approve_item_id) {
            $data[$approve_item_id] = [
                'status' => 'pending',
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }
        $report->approve_items()->attach($data);
    }
}
