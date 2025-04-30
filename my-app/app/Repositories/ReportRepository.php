<?php

namespace App\Repositories;

use App\Interfaces\ReportRepositoryInterface;
use App\Models\Report;

class ReportRepository implements ReportRepositoryInterface 
{
    public function createReport($report_data){
        return Report::create([
            'inspection_details' => $report_data['inspection_details'],
            'concerns' => $report_data['concerns'],
            'construction_id' => $report_data['construction_id'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
