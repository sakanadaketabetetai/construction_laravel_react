<?php

namespace App\Services;

use App\Interfaces\ApproveRepositoryInterface;
use App\Interfaces\ApproveItemRepositoryInterface;
use App\Interfaces\ApproveReportRepositoryInterface;
use App\Models\ApproveItem;

class ApproveService
{
    private $approveRepository;
    private $approveItemRepository;
    private $approveReportRepository;

    public function __construct(
        ApproveRepositoryInterface $approveRepository,
        ApproveItemRepositoryInterface $approveItemRepository,
        ApproveReportRepositoryInterface $approveReportRepository,
    ){
        $this->approveRepository = $approveRepository;
        $this->approveItemRepository = $approveItemRepository;
        $this->approveReportRepository = $approveReportRepository;
    }

    public function createApproveAndApproveItems($approve_data, $approve_items){
        $approve = $this->approveRepository->createApprove($approve_data);
        $this->approveItemRepository->createApproveItem($approve->id, $approve_items);
    }

    public function createReportApprove($report, $approve_id){
        $approve_item_ids = ApproveItem::where('approve_id', $approve_id)->pluck('id')->toArray();
        $this->approveReportRepository->createApproveReport($approve_item_ids, $report->id);
    }
}
