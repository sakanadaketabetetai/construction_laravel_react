<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('equipment', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('設備名称');
            $table->string('model')->comment('型式');
            $table->string('serialNumber')->comment('製造番号');
            $table->string('manufacturer')->comment('製造メーカー');
            $table->enum('status', ['available', 'emergency_reserve', 'maintenance'])->default('available')->comment('設備状態 : 利用可能、非常予備、点検中');
            $table->foreignId('equipment_category_id')->constrained()->onDelete('cascade')->comment('設備カテゴリ');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment');
    }
};
