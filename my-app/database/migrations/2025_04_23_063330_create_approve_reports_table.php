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
        Schema::create('approve_reports', function (Blueprint $table) {
            $table->id();
            $table->foreignId('report_id')->constrained('reports');
            $table->foreignId('approve_item_id')->constrained('approve_items');
            $table->enum('status', ['approved', 'pending', 'rejected'])->default('pending')->comment('承認状態：承認済、承認待ち、却下');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('approve_reports');
    }
};
