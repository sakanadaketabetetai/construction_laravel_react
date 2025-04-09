<?php

namespace Database\Seeders;

use App\Models\Equipment;
use App\Models\EquipmentCategory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EquipmentCategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EquipmentCategory::create([
            'name' => 'LNGタンク',
            'description' => 'LNGタンク本体及び付属設備',
        ]);
        EquipmentCategory::create([
            'name' => 'プライマリーポンプ',
            'description' => 'プライマリーポンプ',
        ]);
        EquipmentCategory::create([
            'name' => 'セカンダリーポンプ',
            'description' => 'セカンダリーポンプ',
        ]);
        EquipmentCategory::create([
            'name' => 'LNG気化器',
            'description' => 'LNG気化器',
        ]);
        EquipmentCategory::create([
            'name' => 'BOGコンプレッサー',
            'description' => 'BOGコンプレッサー',
        ]);
        EquipmentCategory::create([
            'name' => 'アンモニア設備',
            'description' => 'アンモニア設備',
        ]);
        
    }
}
