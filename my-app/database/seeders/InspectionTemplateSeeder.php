<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\InspectionTemplate;

class InspectionTemplateSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        InspectionTemplate::create([
            'name' => 'プライマリーポンプ定期点検(試運転)',
            'description' => 'プライマリーポンプ試運転時の点検項目',
            'equipment_category_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
