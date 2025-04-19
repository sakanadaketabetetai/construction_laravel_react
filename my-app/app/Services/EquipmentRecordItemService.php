<?php

namespace App\Services;

use App\Interfaces\EquipmentRecordItemRepositoryInterface;
use App\Interfaces\InspectionTemplateItemRepositoryInterface;

class EquipmentRecordItemService
{
    private $equipmentRecordItemRepository;
    private $inspectionTemplateItemRepository;

    public function __construct(
        EquipmentRecordItemRepositoryInterface $equipmentRecordItemRepository,
        InspectionTemplateItemRepositoryInterface $inspectionTemplateItemRepository,
    ){
        $this->equipmentRecordItemRepository = $equipmentRecordItemRepository;
        $this->inspectionTemplateItemRepository = $inspectionTemplateItemRepository;
    }


    public function createEquipmentRecordItem(array $equipment_record_items, $record_id, $template_id)
    {
        $formatted_items = [];
        foreach($equipment_record_items as $item){
            $time = $item['time'];
            foreach($item['values'] as $itemName => $value){
                $template_item = $this->inspectionTemplateItemRepository->getInspectionTemplateItemsByName($template_id, $itemName);
                if(!$template_item){
                    continue;
                }

                $formatted_items[] = [
                    'record_id' => $record_id,
                    'template_item_id' => $template_item['id'],
                    'time' => $time,
                    'value' => $value,
                    'created_at' => now(),
                    'updated_at' => now(),
                ];
            }

        }
        $this->equipmentRecordItemRepository->createEquipmentRecordItem($formatted_items);
    }
}
