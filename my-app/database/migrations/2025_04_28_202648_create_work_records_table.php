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
        Schema::create('work_records', function (Blueprint $table) {
            $table->id();
            $table->foreignId('construction_id')->constrained('constructions');
            $table->foreignId('work_log_id')->constrained('work_logs');
            $table->string('work_detail');
            $table->Date('workingDate');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_records');
    }
};
