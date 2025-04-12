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
use App\Repositories\EquipmentRecordRepository;
use App\Interfaces\EquipmentRecordRepositoryInterface;
use App\Repositories\EquipmentCategoryRepository;
use App\Interfaces\EquipmentCategoryRepositoryInterface;

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
        $this->app->bind(EquipmentRecordRepositoryInterface::class, EquipmentRecordRepository::class);
        $this->app->bind(EquipmentCategoryRepositoryInterface::class, EquipmentCategoryRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
