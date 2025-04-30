<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Approve extends Model
{
    protected $fillable = [
        'name',
        'description',
        'created_at',
        'updated_at'
    ];

    public function approve_items(){
        return $this->hasMany(ApproveItem::class);
    }
}
