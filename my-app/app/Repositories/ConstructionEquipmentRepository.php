<?php

namespace App\Repositories;

use App\Models\Construction;
use App\Interfaces\ConstructionEquipmentRepositoryInterface;

class ConstructionEquipmentRepository implements ConstructionEquipmentRepositoryInterface 
{
    public function getConstructionEquipment(){
        Construction::all();
    }

    public function createConstructionEquipment($construction, $equipment_list){
        $construction->equipments()->attach($equipment_list);
        return $construction;
    }

    public function updateConstructionEquipment($data, $equipment_list){
        $construction = Construction::find($data['id']);
        $construction->equipments()->detach();
        $construction->equipments()->attach($equipment_list);
        return $construction;
    }
}
