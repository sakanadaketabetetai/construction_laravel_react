<?php

namespace App\Services;

use App\Interfaces\ReportRepositoryInterface;

class ReportService
{

    private $reportRepository;

    public function __construct(
        ReportRepositoryInterface $reportRepository,
    ){
        $this->reportRepository = $reportRepository;
    }

}
