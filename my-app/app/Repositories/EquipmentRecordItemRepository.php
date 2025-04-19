<?php

namespace App\Repositories;

use App\Interfaces\EquipmentRecordItemRepositoryInterface;
use App\Models\EquipmentRecordItem;
use Illuminate\Database\RecordNotFoundException;

class EquipmentRecordItemRepository implements EquipmentRecordItemRepositoryInterface 
{
    public function getEquipmentRecordItems(){
        return EquipmentRecordItem::all();
    }

    public function getEquipmentRecordItemById($id){
        return EquipmentRecordItem::where('record_id', $id)->get();
    }

    public function createEquipmentRecordItem(array $data){
        return EquipmentRecordItem::insert($data);
    }

    public function getEquipmentRecordItemsByRecordId($record_id){
        return EquipmentRecordItem::where('record_id', $record_id)->get();
    }

    public function updateEquipmentRecordItem(array $data, $record_id){
        if($data){
            foreach ($data as $value){
                $recordItem = EquipmentRecordItem::find($value['id']);
                if (!$recordItem) {
                    throw new RecordNotFoundException("Record not found for ID: $record_id");
                }
                $recordItem->time = $value['time'];
                $recordItem->value = $value['value'];
                $recordItem->updated_at = now();
                $recordItem->save();
            }
        }
        return $recordItem;
    }

    public function deleteEquipmentRecordItem($record_id){
        return EquipmentRecordItem::where('record_id', $record_id)->delete();
    }
}