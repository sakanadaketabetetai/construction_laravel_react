<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ConstructionController;
use App\Http\Controllers\EquipmentController;
use App\Http\Controllers\ApproveController;
use App\Http\Controllers\ReportController;
use App\Http\Controllers\WorkLogController;
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
    Route::get('/construction/edit/{id}', [ConstructionController::class, 'edit']);
    Route::put('/construction/update/{id}', [ConstructionController::class, 'update']);
    Route::get('/construction/schedule', [ConstructionController::class, 'schedule']);
    
    Route::get('/construction/reports', [ReportController::class, 'index']);
    Route::get('/construction/reports/{id}', [ReportController::class, 'detail']);
    Route::get('/construction/reports/create/page', [ReportController::class, 'create_page']);
    Route::post('/construction/reports/create', [ReportController::class, 'create']);
    Route::get('/construction/report/approve-routes', [ApproveController::class, 'approve_route_create_page']);
    Route::post('/construction/report/approve-routes', [ApproveController::class, 'create']);

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

    Route::get('/work-logs', [WorkLogController::class, 'work_log_index']);
    Route::get('/work-logs/detail/{id}', [WorkLogController::class, 'work_log_detail']);
    Route::get('/work-logs/list', [WorkLogController::class, 'work_log_list']);
    Route::get('/work-logs/create', [WorkLogController::class, 'create_work_log_page']);
    Route::post('/work-logs/create', [WorkLogController::class, 'create']);
});

require __DIR__.'/auth.php';
