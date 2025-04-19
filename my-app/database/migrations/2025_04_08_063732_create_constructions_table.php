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
        Schema::create('constructions', function (Blueprint $table) {
            $table->id();
            $table->string('title')->comment('工事件名');
            $table->integer('fiscalYear')->comment('実施年度');
            $table->text('description')->comment('工事内容');
            $table->Date('startDate')->comment('着工日');
            $table->Date('estimatedCompletionDate')->comment('工事完了予定日');
            $table->Date('endDate')->nullable()->comment('竣工日');
            $table->enum('status', ['not_yet_started','ongoing', 'completed', 'delayed'])->default('not_yet_started')->comment('工事進捗状況 : 未着工、進行中、完了、遅延'); 
            $table->foreignId('user_id')->constrained()->onDelete('cascade')->comment('工事担当者');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('constructions');
    }
};
