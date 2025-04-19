<?php

namespace App\Repositories;

use App\Models\Construction;
use App\Interfaces\ConstructionEquipmentRepositoryInterface;

class ConstructionEquipmentRepository implements ConstructionEquipmentRepositoryInterface 
{
    public function createConstructionEquipment($construction, $equipment_list){
        $construction->equipments()->attach($equipment_list);
        return $construction;
    }
}
