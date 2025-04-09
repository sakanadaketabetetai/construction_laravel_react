<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    public function index(){
        return Inertia::render('Equipment/Equipment');
    }

    public function list(){
        return Inertia::render('Equipment/List');
    }
}
