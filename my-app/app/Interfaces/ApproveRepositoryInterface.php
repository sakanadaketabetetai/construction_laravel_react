<?php

namespace App\Interfaces;

interface ApproveRepositoryInterface
{
    public function getApproves();
    public function getApprovesWithApproveItems();
    public function createApprove($approve_data); 
}
