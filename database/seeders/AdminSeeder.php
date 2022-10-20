<?php

namespace Database\Seeders;

use App\Models\Admin;
use Illuminate\Database\Seeder;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Admin::create([
            'full_name' => "Nguyen Tien A ",
            'email' => 'superadmin@example.com',
            'phone' => '0391234567',
            'password' => bcrypt('admin123'),
            'cic_number' => '01234567891',
            'dob' => '2002-11-22',
            'gender' => 0,
            'role' => 0,
            'status' => 0,
        ]);

        Admin::create([
            'full_name' => "Nguyen Tien B ",
            'email' => 'admin@example.com',
            'phone' => '0391234567',
            'password' => bcrypt('admin123'),
            'cic_number' => '01234567891',
            'dob' => '2002-11-22',
            'gender' => 0,
            'role' => 1,
            'status' => 0,
            'station_id' => 1,
        ]);
    }
}
