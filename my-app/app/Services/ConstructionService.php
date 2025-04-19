<?php

namespace App\Services;

use App\Interfaces\ConstructionRepositoryInterface;
use App\Interfaces\ConstructionEquipmentRepositoryInterface;
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
}
