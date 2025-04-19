<?php

namespace App\Interfaces;

interface EquipmentRecordItemRepositoryInterface
{
    public function getEquipmentRecordItems();
    public function getEquipmentRecordItemById($id);
    public function createEquipmentRecordItem(array $date);
    public function updateEquipmentRecordItem(array $data, $record_id);
    public function getEquipmentRecordItemsByRecordId($record_id);
    public function deleteEquipmentRecordItem($record_id);

}
