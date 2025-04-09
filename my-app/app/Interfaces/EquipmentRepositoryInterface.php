<?php

namespace App\Interfaces;

use App\Repositories\EquipmentRepository;

interface EquipmentRepositoryInterface
{
    public function createEquipment(array $data);
}
