<?php

namespace App\Http\Controllers;

use App\Models\Equipment;
use App\Models\EquipmentCategory;
use App\Interfaces\EquipmentRepositoryInterface;
use App\Interfaces\InspectionTemplateRepositoryInterface;
use App\Interfaces\InspectionTemplateItemRepositoryInterface;
use App\Interfaces\EquipmentRecordRepositoryInterface;
use App\Interfaces\EquipmentRecordItemRepositoryInterface;
use App\Interfaces\EquipmentCategoryRepositoryInterface;
use App\Services\EquipmentRecordItemService;
use App\Services\EquipmentRecordService;
use App\Services\InspectionTemplateItemService;
use App\Models\InspectionTemplate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EquipmentController extends Controller
{
    private $equipmentRepository;
    private $inspectionTemplateRepository;
    private $inspectionTemplateItemRepository;
    private $equipmentRecordRepository;
    private $equipmentRecordItemRepository;
    private $equipmentCategoryRepository;
    private $equipmentRecordItemService;
    private $equipmentRecordService;
    private $inspectionTemplateItemService;

    public function __construct(
        EquipmentRepositoryInterface $equipmentRepository,
        InspectionTemplateRepositoryInterface $inspectionTemplateRepository,
        InspectionTemplateItemRepositoryInterface $inspectionTemplateItemRepository,
        EquipmentRecordRepositoryInterface $equipmentRecordRepository,
        EquipmentRecordItemRepositoryInterface $equipmentRecordItemRepository,
        EquipmentCategoryRepositoryInterface $equipmentCategoryRepository,
        EquipmentRecordItemService $equipmentRecordItemService,
        EquipmentRecordService $equipmentRecordService,
        InspectionTemplateItemService $inspectionTemplateItemService
    ){
        $this->equipmentRepository = $equipmentRepository;
        $this->inspectionTemplateRepository = $inspectionTemplateRepository;
        $this->inspectionTemplateItemRepository = $inspectionTemplateItemRepository;
        $this->equipmentRecordRepository = $equipmentRecordRepository;
        $this->equipmentRecordItemRepository = $equipmentRecordItemRepository;
        $this->equipmentCategoryRepository = $equipmentCategoryRepository;
        $this->equipmentRecordItemService = $equipmentRecordItemService;
        $this->equipmentRecordService = $equipmentRecordService;
        $this->inspectionTemplateItemService = $inspectionTemplateItemService;
    }



    public function index(){
        return Inertia::render('Equipment/Equipment');
    }

    public function list(){
        $equipments = $this->equipmentRepository->getEquipment();
        return Inertia::render('Equipment/List', [
            'equipments' => $equipments
        ]);
    }

    public function edit(){
        $equipment_categories = $this->equipmentCategoryRepository->getEquipmentCategories();
        $equipments = $this->equipmentRepository->getEquipment();
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
        $inspection_templates = InspectionTemplate::with('inspection_template_items')->get();
        $equipment_records = $this->equipmentRecordService->getEquipmentRecordAndItems();

        return Inertia::render('Equipment/Inspections/index', [
            'equipments' => $equipments,
            'templates' => $inspection_templates,
            'equipmentRecords' => $equipment_records,
        ]);
    }

    public function inspections_templates() {
        $equipment_categories = $this->equipmentCategoryRepository->getEquipmentCategories();
        return Inertia::render('Equipment/Inspections/Templates/Create', [
            'equipment_categories' => $equipment_categories,
        ]);
    }

    public function create_inspection_template(Request $request){
        $inspection_templates = $request->only('name', 'description','equipment_category_id');
        $inspection_template_items = $request->only('checkItems');
        $inspection_template = $this->inspectionTemplateRepository->createInspectionTemplate($inspection_templates);
        $this->inspectionTemplateItemRepository->createInspectionTemplateItem($inspection_template_items['checkItems'], $inspection_template->id);
        return redirect('/equipment/inspections')->with('success', 'Inspection template created successfully');
    }

    public function equipment_inspection(){
        $equipments = $this->equipmentRepository->getEquipment();
        $inspection_templates = InspectionTemplate::with('inspection_template_items')->get();
        $equipment_records = $this->equipmentRecordRepository->getEquipmentRecords();
        return Inertia::render('Equipment/Inspections/Create', [
            'equipment' => $equipments,
            'templates' => $inspection_templates,
            'equipmentRecords' => $equipment_records,
        ]);
    }

    public function create_equipment_inspection(Request $request){
        $created_by_id = Auth::id();
        $equipment_record = $request->only(['equipment_id', 'template_id','start_time', 'end_time', 'inspection_date', 'notes']);
        $equipment_record_items = $request->get('timeEntries');
        $record = $this->equipmentRecordService->createEquipmentRecord($equipment_record, $created_by_id);
        $this->equipmentRecordItemService->createEquipmentRecordItem($equipment_record_items, $record->id, $equipment_record['template_id']);
        return redirect('/equipment/inspections')->with('success', 'Inspection created successfully');
    }

    public function equipment_inspection_detail($id){
        $record = $this->equipmentRecordService->getEquipmentRecordAndItemById($id);
        $equipment = $this->equipmentRepository->getEquipmentById($record->equipment_id);
        $template = $this->inspectionTemplateItemService->getInspectionTemplateAndItemById($record->template_id);
        return Inertia::render('Equipment/Inspections/Show', [
            'record' => $record,
            'equipment' => $equipment,
            'template' => $template,
        ]);
    }

    public function update_equipment_inspection(Request $request, $id){
        $record = $request->only(['equipment_id', 'template_id','start_time', 'end_time', 'recorded_at', 'notes']);
        $record_items = $request->get('record_items');
        $this->equipmentRecordRepository->updateEquipmentRecord($record, $id);
        $this->equipmentRecordItemRepository->updateEquipmentRecordItem($record_items, $id);
        return redirect('/equipment/inspections')->with('success', 'Inspection updated successfully');
    }

    public function delete_equipment_inspection($id){
        $this->equipmentRecordItemRepository->deleteEquipmentRecordItem($id);
        $this->equipmentRecordRepository->deleteEquipmentRecord($id);
        return redirect('/equipment/inspections')->with('success', 'Inspection deleted successfully');
    }

    public function inspection_template_detail($id){
        //テンプレート編集ページを作成
    }
}
