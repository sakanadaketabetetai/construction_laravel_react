<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Interfaces\ConstructionRepositoryInterface;
use App\Interfaces\WorkLogRepositoryInterface;
use App\Services\WorkLogService;

class WorkLogController extends Controller
{
    private $constructionRepository;
    private $workLogService;
    private $workLogRepository;

    public function __construct(
        ConstructionRepositoryInterface $constructionRepository,
        WorkLogService $workLogService,
        WorkLogRepositoryInterface $workLogRepository,
    ){
        $this->constructionRepository = $constructionRepository;
        $this->workLogService = $workLogService;
        $this->workLogRepository = $workLogRepository;
    }

    public function work_log_index(){
        return inertia::render('WorkLogs/index');
    }

    public function work_log_list(){
        $work_logs = $this->workLogRepository->getWorkLogWithConstructions();
        // dd($work_logs);
        return inertia::render('WorkLogs/List', ['workLogs' => $work_logs]);
    }

    public function work_log_detail($id){
        $work_log = $this->workLogRepository->getWorkLogByIdWithConstruction($id);
        // dd($work_log);
        return inertia::render('WorkLogs/Show', ['workLog' => $work_log]);
    }

    public function create_work_log_page(){
        $status = 'ongoing';
        $constructions = $this->constructionRepository->getConstructionByStatus($status);
        return inertia::render('WorkLogs/Create', [
            'constructions' => $constructions,
        ]);
    }

    public function create(Request $request){
        $work_log = $request->only(['title', 'diaryDate']);
        $work_records = $request['work_records'];
        $work_schedules = $request['work_schedules'];
        $this->workLogService->createWorkLog($work_log, $work_records, $work_schedules);
        return inertia::render('WorkLogs/index');
    }
}
