<?php

namespace App\Repositories;

use App\Interfaces\EquipmentRecordRepositoryInterface;
use App\Models\EquipmentRecord;

class EquipmentRecordRepository implements EquipmentRecordRepositoryInterface 
{
    public function getEquipmentRecords(){
        return EquipmentRecord::all();
    }
}
