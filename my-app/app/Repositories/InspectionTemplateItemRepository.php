<?php

namespace App\Repositories;

use App\Interfaces\InspectionTemplateItemRepositoryInterface;
use App\Models\InspectionTemplateItem;

class InspectionTemplateItemRepository implements InspectionTemplateItemRepositoryInterface 
{
    public function getInspectionTemplateItems(){
        return InspectionTemplateItem::all();
    }

    public function getInspectionTemplateItem($id){
        return InspectionTemplateItem::where('template_id', $id)->get();
    }

    public function createInspectionTemplateItem(array $data, $inspection_template_id){
        $data = array_map(function ($data) use ($inspection_template_id){
            return [
                'template_id' => $inspection_template_id,
                'field_name' => $data['field_name'],
                'unit' => $data['unit'],
                'min_value' => $data['min_value'] ?? null,
                'max_value' => $data['max_value'] ?? null,
                'type' => $data['type'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }, $data);
        InspectionTemplateItem::insert($data);
    }

    public function getInspectionTemplateItemsByName($template_id, $name){
        return InspectionTemplateItem::where('template_id', $template_id)
            ->where('field_name', $name)
            ->first();
    }
}
