<?php

namespace App\Repositories;
use App\Models\Equipment;
use App\Interfaces\EquipmentRepositoryInterface;

class EquipmentRepository implements EquipmentRepositoryInterface
{
    public function getEquipment(){
        return Equipment::all();
    }
    // Implement your repository methods here
    public function createEquipment(array $data){
        return Equipment::create([
            'name' => $data['name'],
            'model'=> $data['model'],
            'serialNumber' => $data['serialNumber'],
            'manufacturer' => $data['manufacturer'],
            'status' => $data['status'],
            'equipment_category_id' => $data['equipment_category_id'],
        ]);
    }
    public function updateEquipment(array $data, $equipmentId){
        $equipment = Equipment::find($equipmentId);
        if (!$equipment) {
            return null; // or throw an exception
        }
        return $equipment->update([
            'name' => $data['name'],
            'model'=> $data['model'],
            'serialNumber' => $data['serialNumber'],
            'manufacturer' => $data['manufacturer'],
            'status' => $data['status'],
            'equipment_category_id' => $data['equipment_category_id'],
        ]);
    }

    public function deleteEquipment($equipmentId){
        $equipment = Equipment::find($equipmentId);
        if (!$equipment) {
            return null; // or throw an exception
        }
        return $equipment->delete();
    }
}
