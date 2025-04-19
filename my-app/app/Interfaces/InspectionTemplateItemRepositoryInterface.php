<?php

namespace App\Interfaces;

interface InspectionTemplateItemRepositoryInterface
{
    public function getInspectionTemplateItems();
    public function getInspectionTemplateItem($id);
    public function createInspectionTemplateItem(array $data, $inspection_template_id);
    public function getInspectionTemplateItemsByName($template_id, $name);
}
