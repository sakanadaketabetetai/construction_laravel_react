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
        Schema::create('constructions_equipments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('construction_id')->constrained('constructions')->onDelete('cascade')->comment('工事ID');
            $table->foreignId('equipment_id')->constrained('equipment')->onDelete('cascade')->comment('設備ID');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('constructions_equipments');
    }
};
