<?php

namespace App\Repositories;

use App\Models\Construction;
use App\Interfaces\ConstructionRepositoryInterface;

class ConstructionRepository implements ConstructionRepositoryInterface 
{
    public function getConstructions(){
        return Construction::all();
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
}
