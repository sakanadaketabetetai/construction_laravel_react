<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\EquipmentCategory;
use App\Interfaces\EquipmentRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    private $equipmentRepository;
    public function __construct(EquipmentRepositoryInterface $equipmentRepository){
        $this->equipmentRepository = $equipmentRepository;
    }
    public function index(){
        return Inertia::render('Equipment/Equipment');
    }

    public function list(){
        $equipments = Equipment::all();
        return Inertia::render('Equipment/List', [
            'equipments' => $equipments
        ]);
    }

    public function edit(){
        $equipment_categories = EquipmentCategory::all();
        $equipments = Equipment::all();
        return Inertia::render('Equipment/Edit', [
            'equipment_categories' => $equipment_categories,
            'equipment' => $equipments
            ]
        );
    }

    public function create(Request $request){
        $equipment_data = $request->all();
        $this->equipmentRepository->createEquipment($equipment_data);
        return redirect('/equipment/edit')->with('success', 'Equipment created successfully');
    }
}
