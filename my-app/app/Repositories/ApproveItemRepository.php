<?php

namespace App\Repositories;

use App\Interfaces\ApproveItemRepositoryInterface;
use App\Models\ApproveItem;

class ApproveItemRepository implements ApproveItemRepositoryInterface 
{
    public function createApproveItem($approve_id, array $approve_items){
        $approve_items = array_map(function ($approve_items) use ($approve_id){
            return [
                'name' => $approve_items['name'],
                'approve_id' => $approve_id,
                'user_id' => $approve_items['user_id'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }, $approve_items);
        ApproveItem::insert($approve_items);
    }
}
