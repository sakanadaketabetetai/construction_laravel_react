<?php

namespace App\Repositories;

use App\Models\Construction;
use App\Interfaces\ConstructionRepositoryInterface;

class ConstructionRepository implements ConstructionRepositoryInterface 
{
    public function getConstructions(){
        return Construction::all();
    }

    public function getConstructionsWithReport(){
        return Construction::with('report')->get();
    }
    public function getConstructionsWithReportAndApprove(){
        return Construction::with('report.approve_items')->get();
    }

    public function getConstructionsWithReportAndApproveById($id){
        return Construction::with('report.approve_items')->find($id);
    }

    public function getConstructionByStatus($status){
        return Construction::where('status', $status)->get();
    }
    
    public function getConstructionWithEquipmentId(){
        return Construction::with('equipments')
        ->get()
        ->map(function($construction){
            return [
                'title' => $construction->title,
                'fiscalYear' => $construction->fiscalYear,
                'description' => $construction->description,
                'startDate' => $construction->startDate,
                'estimatedCompletionDate' => $construction->estimatedCompletionDate,
                'endDate' => $construction->endDate,
                'status' => $construction->status,
                'user_id' => $construction->user_id,
                'equipment_ids' => $construction->equipment->pluck('id')->toArray(), 
            ];
        });
    }

    public function createConstruction($data, $user_id){
        return  Construction::create([
            'title' => $data['title'],
            'fiscalYear' => $data['fiscalYear'],
            'description' => $data['description'],
            'startDate' => $data['startDate'],
            'estimatedCompletionDate' => $data['estimatedCompletionDate'],
            'endDate' => $data['endDate'],
            'status' => $data['status'],
            'user_id' => $user_id,
        ]);
    }

    public function updateConstruction($data){
        $construction = Construction::find($data['id']);
        $construction->title = $data['title'];
        $construction->fiscalYear = $data['fiscalYear'];
        $construction->description = $data['description'];
        $construction->startDate = $data['startDate'];
        $construction->estimatedCompletionDate = $data['estimatedCompletionDate'];
        $construction->endDate = $data['endDate'];
        $construction->status = $data['status'];
        $construction->user_id = $data['user_id'];
        $construction->save();
        return $construction;
    }
}
