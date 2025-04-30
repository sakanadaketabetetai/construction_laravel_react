<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ApproveItem extends Model
{
    protected $fillable = [
        'name',
        'approve_id',
        'user_id'
    ];

    public function approve(){
        return $this->belongsToMany(Approve::class);
    }

    public function reports(){
        return $this->belongsToMany(Report::class, 'approve_reports', 'approve_item_id', 'report_id')->withPivot(['approve_item_id', 'report_id', 'status']);
    }

    public function user(){
        return $this->belongsTo(User::class);
    }
}
