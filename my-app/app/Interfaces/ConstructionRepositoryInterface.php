<?php

namespace App\Interfaces;

interface ConstructionRepositoryInterface
{
    public function getConstructions();
    public function createConstruction($data, $user_id);

}
