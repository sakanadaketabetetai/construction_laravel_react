<?php

namespace App\Interfaces;


interface EquipmentRepositoryInterface
{
    public function getEquipment();
    public function getEquipmentById($equipment_id);
    public function createEquipment(array $data);
    public function updateEquipment(array $data, $equipmentId);
    public function deleteEquipment($equipmentId);
}
