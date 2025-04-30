<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\ApproveRepositoryInterface;
use App\Interfaces\ApproveItemRepositoryInterface;
use App\Interfaces\UserRepositoryInterface;
use App\Services\ApproveService;
use Inertia\Inertia;

class ApproveController extends Controller
{
    private $approveRepository;
    private $approveItemRepository;
    private $approveService;
    private $userRepository;

    public function __construct(
        ApproveRepositoryInterface $approveRepository,
        ApproveItemRepositoryInterface $approveItemRepository,
        UserRepositoryInterface $userRepository,
        ApproveService $approveService,
    ){
        $this->approveRepository = $approveRepository;
        $this->userRepository = $userRepository;
        $this->approveService = $approveService;
    }

    public function approve_route_create_page(){
        $users = $this->userRepository->getUsers();
        return inertia::render('Construction/Reports/ApproveRoutes/Create', ['users' => $users]);
    }

    public function create(Request $request){
        $approve_data = $request->only(['name', 'description']);
        $approve_items = $request->get('approvers');
        $this->approveService->createApproveAndApproveItems($approve_data, $approve_items);
        return redirect('/construction/report/approve-routes');
    }
}
