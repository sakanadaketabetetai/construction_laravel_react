<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Repositories\UserRepository;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\EquipmentRepository;
use App\Interfaces\EquipmentRepositoryInterface;
use App\Repositories\InspectionTemplateRepository;
use App\Interfaces\InspectionTemplateRepositoryInterface;
use App\Repositories\InspectionTemplateItemRepository;
use App\Interfaces\InspectionTemplateItemRepositoryInterface;
use App\Repositories\EquipmentRecordRepository;
use App\Interfaces\EquipmentRecordRepositoryInterface;
use App\Repositories\EquipmentRecordItemRepository;
use App\Interfaces\EquipmentRecordItemRepositoryInterface;
use App\Repositories\EquipmentCategoryRepository;
use App\Interfaces\EquipmentCategoryRepositoryInterface;
use App\Interfaces\ConstructionRepositoryInterface;
use App\Repositories\ConstructionRepository;
use App\Repositories\ConstructionEquipmentRepository;
use App\Interfaces\ConstructionEquipmentRepositoryInterface;
use App\Repositories\ReportRepository;
use App\Interfaces\ApproveRepositoryInterface;
use App\Repositories\ApproveRepository;
use App\Interfaces\ReportRepositoryInterface;
use App\Repositories\ApproveItemRepository;
use App\Interfaces\ApproveItemRepositoryInterface;
use App\Repositories\ApproveReportRepository;
use App\Interfaces\ApproveReportRepositoryInterface;
use App\Interfaces\WorkLogRepositoryInterface;
use App\Repositories\WorkLogRepository;
use App\Interfaces\WorkRecordRepositoryInterface;
use App\Repositories\WorkRecordRepository;
use App\Interfaces\WorkScheduleRepositoryInterface;
use App\Repositories\WorkScheduleRepository;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(EquipmentRepositoryInterface::class, EquipmentRepository::class);
        $this->app->bind(InspectionTemplateRepositoryInterface::class, InspectionTemplateRepository::class);
        $this->app->bind(InspectionTemplateItemRepositoryInterface::class, InspectionTemplateItemRepository::class);
        $this->app->bind(EquipmentRecordRepositoryInterface::class, EquipmentRecordRepository::class);
        $this->app->bind(EquipmentRecordItemRepositoryInterface::class, EquipmentRecordItemRepository::class);
        $this->app->bind(EquipmentCategoryRepositoryInterface::class, EquipmentCategoryRepository::class);
        $this->app->bind(ConstructionRepositoryInterface::class, ConstructionRepository::class);
        $this->app->bind(ConstructionEquipmentRepositoryInterface::class, ConstructionEquipmentRepository::class);
        $this->app->bind(ReportRepositoryInterface::class, ReportRepository::class);
        $this->app->bind(ApproveRepositoryInterface::class, ApproveRepository::class);
        $this->app->bind(ApproveItemRepositoryInterface::class, ApproveItemRepository::class);
        $this->app->bind(ApproveReportRepositoryInterface::class, ApproveReportRepository::class);
        $this->app->bind(WorkLogRepositoryInterface::class, WorkLogRepository::class);
        $this->app->bind(WorkRecordRepositoryInterface::class, WorkRecordRepository::class);
        $this->app->bind(WorkScheduleRepositoryInterface::class, WorkScheduleRepository::class);

    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
