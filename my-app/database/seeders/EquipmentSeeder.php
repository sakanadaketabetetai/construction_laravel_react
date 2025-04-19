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
        Equipment::create([
            'name' => '№1セカンダリーポンプ',
            'model' => 'PU-211',
            'serialNumber' => 'BN123456',
            'manufacturer' => 'メーカーB',
            'status' => 'available',
            'equipment_category_id' => 3,
        ]);
        Equipment::create([
            'name' => '№2セカンダリーポンプ',
            'model' => 'PU-221',
            'serialNumber' => 'BN123456',
            'manufacturer' => 'メーカーB',
            'status' => 'available',
            'equipment_category_id' => 3,
        ]);
        Equipment::create([
            'name' => '№3セカンダリーポンプ',
            'model' => 'PU-231',
            'serialNumber' => 'BN123456',
            'manufacturer' => 'メーカーB',
            'status' => 'available',
            'equipment_category_id' => 3,
        ]);

    }
}
