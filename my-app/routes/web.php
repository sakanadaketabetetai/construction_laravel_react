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
    Route::get('/construction/create', [ConstructionController::class, 'create']);
    Route::get('/equipment', [EquipmentController::class, 'index']);
    Route::get('/equipment/list', [EquipmentController::class, 'list']);
    Route::get('/equipment/edit', [EquipmentController::class, 'edit']);
    Route::post('/equipment/create', [EquipmentController::class, 'create']);

});

require __DIR__.'/auth.php';
