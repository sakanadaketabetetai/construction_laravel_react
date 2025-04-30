<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\ConstructionRepositoryInterface;
use App\Interfaces\ApproveRepositoryInterface;
use App\Repositories\ReportRepository;
use App\Services\ApproveService;
use inertia\Inertia;

class ReportController extends Controller
{

    private $constructionRepository;
    private $approveRepository;
    private $reportRepository;
    private $approveService;

    public function __construct(
        ConstructionRepositoryInterface $constructionRepository,
        ApproveRepositoryInterface $approveRepository,
        ReportRepository $reportRepository,
        ApproveService $approveService,
    ) {
        $this->constructionRepository = $constructionRepository;
        $this->approveRepository = $approveRepository;
        $this->reportRepository = $reportRepository; 
        $this->approveService = $approveService;
    }

    public function index(){
        $constructions = $this->constructionRepository->getConstructionsWithReportAndApprove();
        $approves = $this->approveRepository->getApprovesWithApproveItems();
        // dd($constructions);
        return inertia::render('Construction/Reports/Index',[
            'constructions' => $constructions, 
            'approves' => $approves,
        ]); 
    }

    public function create_page() {
        $constructions = $this->constructionRepository->getConstructions(); 
        $approves = $this->approveRepository->getApprovesWithApproveItems();
        return inertia::render('Construction/Reports/Create',[
            'constructions' => $constructions,
            'approves' => $approves,
        ]); 
    }

    public function create(Request $request){
        $report_data = $request->only(['inspection_details', 'concerns', 'construction_id']);
        $approve_id = $request->approve_id;
        $report = $this->reportRepository->createReport($report_data);
        $this->approveService->createReportApprove($report, $approve_id);
        return inertia::render('Construction/Construction');
    }

    public function detail($id){
        $construction = $this->constructionRepository->getConstructionsWithReportAndApproveById($id);
        return inertia::render('Construction/Show', [
            'construction' => $construction,
        ]);
    }
}
