<?php

namespace App\Interfaces;

interface ConstructionRepositoryInterface
{
    public function getConstructions();
    public function getConstructionsWithReport();
    public function getConstructionsWithReportAndApprove();
    public function getConstructionByStatus($status);
    public function getConstructionsWithReportAndApproveById($id);
    public function getConstructionWithEquipmentId();
    public function createConstruction($data, $user_id);
    public function updateConstruction($data);

}
