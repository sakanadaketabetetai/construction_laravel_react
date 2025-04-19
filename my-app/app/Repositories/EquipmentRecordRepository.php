<?php

namespace App\Repositories;

use App\Interfaces\EquipmentRecordRepositoryInterface;
use App\Models\EquipmentRecord;

class EquipmentRecordRepository implements EquipmentRecordRepositoryInterface 
{
    public function getEquipmentRecords(){
        return EquipmentRecord::all();
    }

    public function getEquipmentRecordById($id){
        return EquipmentRecord::find($id);
    }

    public function createEquipmentRecord($data, $created_by_id){
        $record = EquipmentRecord::create([
            'equipment_id' => $data['equipment_id'],
            'template_id' => $data['template_id'],
            'created_by_id' => $created_by_id,
            'start_time' => $data['start_time'],
            'end_time' => $data['end_time'],
            'recorded_at' => $data['inspection_date'],
            'notes' => $data['notes'],
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return $record;
    }

    public function updateEquipmentRecord($data, $id){
        $record = EquipmentRecord::find($id);
        if($record){
            $record->equipment_id = $data['equipment_id'];
            $record->template_id = $data['template_id'];
            $record->start_time = $data['start_time'];
            $record->end_time = $data['end_time'];
            $record->recorded_at = $data['recorded_at'];
            $record->notes = $data['notes'];
            $record->updated_at = now();
            $record->save();
        }
        return $record;
    }
    public function deleteEquipmentRecord($id){
        return EquipmentRecord::destroy($id);
    }

}
