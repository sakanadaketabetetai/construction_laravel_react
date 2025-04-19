<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\InspectionTemplateItem;

class InspectionTemplateItemSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        InspectionTemplateItem::create([
            'template_id' => 1,
            'field_name' => '出口圧力',
            'unit' => 'MPa',
            'min_value' => null,
            'max_value' => null,
            'type' => 'measurement',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        InspectionTemplateItem::create([
            'template_id' => 1,
            'field_name' => '出口流量',
            'unit' => 't/h',
            'min_value' => null,
            'max_value' => null,
            'type' => 'measurement',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        InspectionTemplateItem::create([
            'template_id' => 1,
            'field_name' => '電流値',
            'unit' => 'A',
            'min_value' => null,
            'max_value' => null,
            'type' => 'measurement',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
