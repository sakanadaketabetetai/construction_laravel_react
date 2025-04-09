<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ConstructionController extends Controller
{
    public function index(){
        return inertia::render('Construction/Construction');
    }

    public function create(){
        return inertia::render('Construction/Create');
    }
}
