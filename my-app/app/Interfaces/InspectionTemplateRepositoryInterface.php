<?php

namespace App\Interfaces;

interface InspectionTemplateRepositoryInterface 
{
    public function getInspectionTemplates();
    public function getInspectionTemplateById($id);
    public function createInspectionTemplate($data);
}
