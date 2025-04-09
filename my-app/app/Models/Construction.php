<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Construction extends Model
{
    protected $fillable = [];


    public function user() {
        return $this->belongsTo(User::class);
    }
}
