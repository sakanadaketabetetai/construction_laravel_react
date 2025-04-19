<?php

namespace App\Interfaces;

interface EquipmentRecordRepositoryInterface
{
    public function getEquipmentRecords();
    public function getEquipmentRecordById($id);
    public function createEquipmentRecord($data, $created_by_id);
    public function updateEquipmentRecord($data, $record_id);
    public function deleteEquipmentRecord($record_id);
}
