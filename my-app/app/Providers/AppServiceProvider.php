<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use App\Repositories\UserRepository;
use App\Interfaces\UserRepositoryInterface;
use App\Repositories\EquipmentRepository;
use App\Interfaces\EquipmentRepositoryInterface;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->bind(UserRepositoryInterface::class, UserRepository::class);
        $this->app->bind(EquipmentRepositoryInterface::class, EquipmentRepository::class);
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);
    }
}
