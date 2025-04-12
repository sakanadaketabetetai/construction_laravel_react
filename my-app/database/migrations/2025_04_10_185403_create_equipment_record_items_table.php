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
        Schema::create('equipment_record_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('record_id')->constrained('equipment_records')->onDelete('cascade');
            $table->foreignId('template_item_id')->constrained('inspection_template_items')->onDelete('cascade');
            $table->float('value')->comment('記録値');
            $table->string('unit')->comment('単位 例:MPa,℃');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment_record_items');
    }
};
