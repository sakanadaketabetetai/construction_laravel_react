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
        Schema::create('inspection_template_items', function (Blueprint $table) {
            $table->id();
            $table->foreignId('template_id')->constrained('inspection_templates')->onDelete('cascade');
            $table->string('field_name')->comment('記録項目名 例:温度,圧力');
            $table->string('unit')->comment('単位 例:MPa,℃');
            $table->float('min_value')->nullable()->comment('最小値');
            $table->float('max_value')->nullable()->comment('最大値');
            $table->enum('type', ['visual','measurement','functional'])->comment('確認項目の種類 visual:目視確認, measurement:測定, functional:機能確認');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inspection_template_items');
    }
};
