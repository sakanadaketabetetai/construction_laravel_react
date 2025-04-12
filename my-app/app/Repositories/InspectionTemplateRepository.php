<?php

namespace App\Repositories;

use App\Interfaces\InspectionTemplateRepositoryInterface;
use App\Models\InspectionTemplate;

class InspectionTemplateRepository implements InspectionTemplateRepositoryInterface
{
    // Implement your repository methods here
    public function getInspectionTemplates()
    {
      return InspectionTemplate::all();
    }
}
