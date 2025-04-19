<?php

namespace App\Services;

use App\Interfaces\EquipmentRecordRepositoryInterface;
use App\Interfaces\EquipmentRecordItemRepositoryInterface;
use App\Models\Equipment;

class EquipmentRecordService
{
    private $equipmentRecordRepository;
    private $equipmentRecordItemRepository;

    public function __construct(
        EquipmentRecordRepositoryInterface $equipmentRecordRepository,
        EquipmentRecordItemRepositoryInterface $equipmentRecordItemRepository,
    ){
        $this->equipmentRecordRepository = $equipmentRecordRepository;
        $this->equipmentRecordItemRepository = $equipmentRecordItemRepository;
    }

    public function createEquipmentRecord($data, $created_by_id)
    {
        $record = $this->equipmentRecordRepository->createEquipmentRecord($data, $created_by_id);
        return $record;
    }

    public function getEquipmentRecordAndItems(){
        $records = $this->equipmentRecordRepository->getEquipmentRecords();
        $records = $records->map(function($record){
            $record->record_items = $this->equipmentRecordItemRepository->getEquipmentRecordItemsByRecordId($record->id);
            return $record;
        });
        return $records;
    }

    public function getEquipmentRecordAndItemById($id){
        $record = $this->equipmentRecordRepository->getEquipmentRecordById($id);
        $record->record_items = $this->equipmentRecordItemRepository->getEquipmentRecordItemById($record->id);
        return $record;
    }
    
    
}
