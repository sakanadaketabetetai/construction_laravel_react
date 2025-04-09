<?php

namespace App\Repositories;
use App\Models\Equipment;
use App\Interfaces\EquipmentRepositoryInterface;

class EquipmentRepository implements EquipmentRepositoryInterface
{
    // Implement your repository methods here
    public function createEquipment(array $data){
        return Equipment::create([
            'name' => $data['name'],
            'model'=> $data['model'],
            'serialNumber' => $data['serialNumber'],
            'manufacturer' => $data['manufacturer'],
            'status' => $data['status'],
            'equipment_category_id' => $data['category_id'],
        ]);
    }
}
