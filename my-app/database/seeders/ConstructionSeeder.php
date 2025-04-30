<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Construction;

class ConstructionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $construction1 = Construction::create([
            'title' => 'プライマリーポンプ定期点検',
            'fiscalYear' => '2025',
            'description' => '定期点検：1A,1Bプライマリーポンプ',
            'startDate' => '2025-04-27',
            'estimatedCompletionDate' => '2025-05-27',
            'endDate' => '2025-04-27',
            'status' => 'ongoing',
            'user_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $construction2 = Construction::create([
            'title' => 'セカンダリーポンプ定期点検',
            'fiscalYear' => '2025',
            'description' => '定期点検：№1,2セカンダリーポンプ',
            'startDate' => '2025-05-27',
            'estimatedCompletionDate' => '2025-06-27',
            'endDate' => null,
            'status' => 'not_yet_started',
            'user_id' => 2,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $construction3 = Construction::create([
            'title' => '1Cプライマリーポンプ、№3セカンダリーポンプ定期点検',
            'fiscalYear' => '2025',
            'description' => '定期点検：1Cプライマリーポンプ、№3セカンダリーポンプ',
            'startDate' => '2025-06-27',
            'estimatedCompletionDate' => '2025-07-27',
            'endDate' => null,
            'status' => 'not_yet_started',
            'user_id' => 1,
            'created_at' => now(),
            'updated_at' => now(),
        ]);
        $equipment1_list = [1,2];
        $equipment2_list = [4,5];
        $equipment3_list = [3,6];
        $construction1->equipments()->attach($equipment1_list);
        $construction2->equipments()->attach($equipment2_list);
        $construction3->equipments()->attach($equipment3_list);
    }
}
