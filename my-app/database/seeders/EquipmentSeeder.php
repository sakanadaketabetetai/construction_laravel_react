<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Equipment;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Equipment::create([
            'name' => '1Aプライマリーポンプ',
            'model' => 'PU-111A',
            'serialNumber' => 'SN123456',
            'manufacturer' => 'メーカーA',
            'status' => 'available',
            'equipment_category_id' => 2,
        ]);
        Equipment::create([
            'name' => '1Bプライマリーポンプ',
            'model' => 'PU-111B',
            'serialNumber' => 'SN123456',
            'manufacturer' => 'メーカーA',
            'status' => 'available',
            'equipment_category_id' => 2,
        ]);
        Equipment::create([
            'name' => '1Cプライマリーポンプ',
            'model' => 'PU-111C',
            'serialNumber' => 'SN123456',
            'manufacturer' => 'メーカーA',
            'status' => 'available',
            'equipment_category_id' => 2,
        ]);
    }
}
