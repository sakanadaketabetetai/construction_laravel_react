<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConstructionController;
use App\Http\Controllers\EquipmentController;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});




Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');    
    Route::get('/construction', [ConstructionController::class, 'index']);
    Route::get('/construction/list', [ConstructionController::class, 'construction_list']);
    Route::get('/construction/create', [ConstructionController::class, 'create_page']);
    Route::post('/construction/store', [ConstructionController::class, 'store']);
    Route::get('/equipment', [EquipmentController::class, 'index']);
    Route::get('/equipment/list', [EquipmentController::class, 'list']);
    Route::get('/equipment/edit', [EquipmentController::class, 'edit']);
    Route::post('/equipment/create', [EquipmentController::class, 'create']);
    Route::put('/equipment/{id}', [EquipmentController::class, 'update']);
    Route::delete('/equipment/{id}', [EquipmentController::class, 'delete']);
    Route::get('/equipment/inspections', [EquipmentController::class, 'inspections']);
    Route::get('/equipment/inspections/templates/create', [EquipmentController::class, 'inspections_templates']);
    Route::post('/equipment/inspections/templates/create', [EquipmentController::class,'create_inspection_template']);
    Route::get('/equipment/inspections/create', [EquipmentController::class,'equipment_inspection']);
    Route::post('/equipment/inspections/create', [EquipmentController::class,'create_equipment_inspection']);
    Route::get('/equipment/inspections/{id}', [EquipmentController::class,'equipment_inspection_detail']);
    Route::put('/equipment/inspections/{id}', [EquipmentController::class,'update_equipment_inspection']);
    Route::delete('/equipment/inspections/{id}', [EquipmentController::class,'delete_equipment_inspection']);
});

require __DIR__.'/auth.php';
