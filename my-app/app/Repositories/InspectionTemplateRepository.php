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

    public function getInspectionTemplateById($id){
      return InspectionTemplate::find($id);
    }

    public function createInspectionTemplate($data){
      return InspectionTemplate::create([
          'name' => $data['name'],
          'description' => $data['description'],
          'equipment_category_id' => $data['equipment_category_id'],
          'created_at' => now(),
          'updated_at' => now(),
        ]);
    }
}
