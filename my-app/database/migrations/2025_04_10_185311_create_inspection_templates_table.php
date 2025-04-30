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
        Schema::create('inspection_templates', function (Blueprint $table) {
            $table->id();
            $table->string('name')->comment('点検記録テンプレート名');
            $table->text('description')->nullable()->comment('点検テンプレート説明');
            $table->foreignId('equipment_category_id')->constrained()->onDelete('cascade');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_templates');
    }
};
