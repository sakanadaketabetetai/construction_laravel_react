<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'name' => '山田太郎',
            'email' => 'yamada@example.com',
            'password' => Hash::make('yamada12345'),
            'employee_id' => '123456',
        ]);
        User::create([
            'name' => '田中太郎',
            'email' => 'tanaka@example.com',
            'password' => Hash::make('tanaka12345'),
            'employee_id' => '234567',
        ]);
        User::create([
            'name' => '松田太郎',
            'email' => 'matsuda@example.com',
            'password' => Hash::make('matsuda12345'),
            'employee_id' => '345678',
        ]);
        User::create([
            'name' => '阿部太郎',
            'email' => 'abe@example.com',
            'password' => Hash::make('abe12345'),
            'employee_id' => '456789',
        ]);
    }
}
