<?php

namespace App\Repositories;

use App\Interfaces\ApproveRepositoryInterface;
use App\Models\Approve;

class ApproveRepository implements ApproveRepositoryInterface 
{

    public function getApproves(){
        $approves = Approve::all();
        return $approves;
    }

    public function getApprovesWithApproveItems(){
        $approves = Approve::with('approve_items')->get();
        return $approves;
    }
    
    public function createApprove($approve_data){
        return Approve::create([
            'name' => $approve_data['name'],
            'description' => $approve_data['description'],
        ]);
    }
}
