<?php

namespace App\Interfaces;

interface ConstructionEquipmentRepositoryInterface
{
    public function createConstructionEquipment($construction, $equipment_list);
    public function updateConstructionEquipment($construction, $equipment_list);
}
