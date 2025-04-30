<?php

namespace App\Services;

use App\Interfaces\ConstructionRepositoryInterface;
use App\Interfaces\ConstructionEquipmentRepositoryInterface;
use App\Models\Construction;
use Illuminate\Support\Facades\Auth;


class ConstructionService
{
    public $constructionRepository;
    public $constructionEquipmentRepository;

    public function __construct(
        ConstructionRepositoryInterface $constructionRepository,
        ConstructionEquipmentRepositoryInterface $constructionEquipmentRepository,
    ){
        $this->constructionRepository = $constructionRepository;
        $this->constructionEquipmentRepository = $constructionEquipmentRepository;
    }

    public function createConstructionAndEquipment($request) {
        $user_id = Auth::id();
    
        // 配列から必要なデータを抽出
        $data = array_intersect_key($request, array_flip(['title', 'fiscalYear', 'description', 'startDate','endDate','estimatedCompletionDate', 'status']));
    
        $construction = $this->constructionRepository->createConstruction($data, $user_id);
    
        $equipment_list = $request['equipment_ids']; // 配列から取得

        $this->constructionEquipmentRepository->createConstructionEquipment($construction, $equipment_list);
    
        return $construction;
    }

    public function getConstructionAndEquipmentIds(){
        $constructions = Construction::with('equipments')->get();

        $constructions->transform(function($construction){
            $construction->equipment_ids = $construction->equipments->pluck('id')->toArray();
            return $construction;
        });
        return $constructions;
    }

    public function getConstructionByIdWithEquipment($id){
        $construction = Construction::with('equipments')->find($id);
        $construction->equipment_ids = $construction->equipments->pluck('id')->toArray();
        return $construction;
    }

    public function updateConstructionAndEquipmentId($construction){
        $data = array_intersect_key($construction, array_flip(['id','title', 'fiscalYear', 'description', 'startDate','endDate','estimatedCompletionDate', 'status', 'user_id']));
        $this->constructionRepository->updateConstruction($data);
        $equipment_list = $construction['equipment_ids'];
        $this->constructionEquipmentRepository->updateConstructionEquipment($data, $equipment_list);
    }
}
