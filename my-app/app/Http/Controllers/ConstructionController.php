<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Interfaces\ConstructionRepositoryInterface;
use App\Interfaces\EquipmentCategoryRepositoryInterface;
use App\Interfaces\EquipmentRepositoryInterface;
use App\Services\ConstructionService;
use Inertia\Inertia;

class ConstructionController extends Controller
{
    private $constructionRepository;
    private $equipmentRepository;
    private $equipmentCategoryRepository;
    private $constructionService;
    public function __construct(
        ConstructionRepositoryInterface $constructionRepository,
        EquipmentRepositoryInterface $equipmentRepository,
        EquipmentCategoryRepositoryInterface $equipmentCategoryRepository,
        ConstructionService $constructionService,
    ){
        $this->constructionRepository = $constructionRepository;
        $this->equipmentRepository = $equipmentRepository;
        $this->equipmentCategoryRepository = $equipmentCategoryRepository;
        $this->constructionService = $constructionService;
    }


    public function index(){
        return inertia::render('Construction/Construction');
    }

    public function construction_list(){
        $equipmentCategories = $this->equipmentCategoryRepository->getEquipmentCategories();
        $constructions = $this->constructionRepository->getConstructions();
        $equipments = $this->equipmentRepository->getEquipment();
        return inertia::render('Construction/List', [
            'equipment' => $equipments,
            'equipmentCategories' => $equipmentCategories,
            'constructions' => $constructions,
        ]);
    }

    public function create_page(){
        $equipments = $this->equipmentRepository->getEquipment();
        $equipmentCategories = $this->equipmentCategoryRepository->getEquipmentCategories();
        return inertia::render('Construction/Create', [
            'equipment' => $equipments,
            'equipmentCategories' => $equipmentCategories,
        ]);
    }

    public function store(Request $request){
        $data = $request->all();
        $this->constructionService->createConstructionAndEquipment($data);
        return inertia::render('Construction/Construction');
    }

}
