<?php

namespace App\Interfaces;

interface ApproveItemRepositoryInterface
{
    public function createApproveItem($approve_id, array $approve_items);
}
