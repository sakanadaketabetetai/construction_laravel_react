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
        Schema::create('equipment_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('equipment_id')->constrained('equipment')->onDelete('cascade');
            $table->foreignId('template_id')->constrained('inspection_templates')->onDelete('cascade');
            $table->string('recorded_at')->comment('記録日');
            $table->string('start_time')->comment('試運転開始時間');
            $table->string('end_time')->comment('試運転終了時間');
            $table->foreignId('created_by_id')->constrained('users')->comment('記録者ID');
            $table->text('notes')->nullable()->comment('備考');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('equipment_records');
    }
};
