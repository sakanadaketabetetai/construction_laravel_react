<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Report extends Model
{
    protected $fillable = [
        'inspection_details',
        'concerns',
        'construction_id'
    ];

    public function construction(){
        return $this->belongsTo(Construction::class);
    }

    public function approve_items(){
        return $this->belongsToMany(ApproveItem::class, 'approve_reports', 'report_id', 'approve_item_id')->withPivot(['approve_item_id', 'report_id', 'status']);
    }
}
