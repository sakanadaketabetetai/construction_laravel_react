<?php

namespace App\Repositories;
use App\Interfaces\EquipmentCategoryRepositoryInterface;
use App\Models\EquipmentCategory;

class EquipmentCategoryRepository implements EquipmentCategoryRepositoryInterface 
{
    public function getEquipmentCategories(){
        return EquipmentCategory::all();
    }
}
