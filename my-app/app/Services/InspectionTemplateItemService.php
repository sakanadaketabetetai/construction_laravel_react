<?php

namespace App\Services;
use App\Interfaces\InspectionTemplateRepositoryInterface;
use App\Interfaces\InspectionTemplateItemRepositoryInterface;

class InspectionTemplateItemService
{
    private $inspectionTemplateRepository;
    private $inspectionTemplateItemRepository;

    public function __construct(
        InspectionTemplateRepositoryInterface $inspectionTemplateRepository, 
        InspectionTemplateItemRepositoryInterface $inspectionTemplateItemRepository, 
    ) {
        $this->inspectionTemplateRepository = $inspectionTemplateRepository;
        $this->inspectionTemplateItemRepository = $inspectionTemplateItemRepository;

    }

    public function getInspectionTemplateAndItemById($id){
        $template = $this->inspectionTemplateRepository->getInspectionTemplateById($id);
        $template->inspection_template_items = $this->inspectionTemplateItemRepository->getInspectionTemplateItem($id);
        return $template;
    }
}
