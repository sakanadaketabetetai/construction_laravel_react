<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\EquipmentCategory;
use App\Interfaces\EquipmentRepositoryInterface;

use App\Interfaces\InspectionTemplateRepositoryInterface;
use App\Models\EquipmentRecord;
use App\Interfaces\EquipmentRecordRepositoryInterface;
use App\Repositories\EquipmentRecordRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    private $equipmentRepository;
    private $inspectionRepository;
    private $equipmentRecordRepository;
    public function __construct(
        EquipmentRepositoryInterface $equipmentRepository,
        InspectionTemplateRepositoryInterface $inspectionRepository,
        EquipmentRecordRepositoryInterface $equipmentRecordRepository){
        $this->equipmentRepository = $equipmentRepository;
        $this->inspectionRepository = $inspectionRepository;
        $this->equipmentRecordRepository = $equipmentRecordRepository;
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

    public function update(Request $request, $id){
        $equipment_data = $request->all();
        $this->equipmentRepository->updateEquipment($equipment_data, $id);
        return redirect('/equipment/edit')->with('success', 'Equipment updated successfully');
    }

    public function delete($id){
        $this->equipmentRepository->deleteEquipment($id);
        return redirect('/equipment/edit')->with('success', 'Equipment deleted successfully');
    }

    public function inspections() {
        $equipments = $this->equipmentRepository->getEquipment();
        $inspection_templates = $this->inspectionRepository->getInspectionTemplates();
        $inspection__records = $this->equipmentRecordRepository->getEquipmentRecords();
        return Inertia::render('Equipment/Inspections/index', [
            'equipments' => $equipments,
            'templates' => $inspection_templates,
            'inspectionRecords' => $inspection__records,
        ]);
    }

    public function inspections_templates() {
        $equipment_categories = EquipmentCategory::all();
        return Inertia::render('Equipment/Inspections/Templates/Create', [
            'equipment_categories' => $equipment_categories,
        ]);
    }
}
