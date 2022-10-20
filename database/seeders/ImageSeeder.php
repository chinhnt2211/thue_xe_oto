<?php

namespace Database\Seeders;

use App\Enums\ImageEnum;
use App\Models\Admin;
use App\Models\Contract;
use App\Models\Image;
use App\Models\Vehicle;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
//       Admin
        for ($x = 1; $x <= 52; $x++) {
            $nameAvatar = 'admins_avatar_'.$x.'-'.fake()->word();
            Image::create([
                'imageable_id' => $x,
                'imageable_type' => Admin::class,
                'link' => fake()->imageUrl(640, 480, 'avatar', true),
                'name' => $nameAvatar,
                'type' => ImageEnum::AVATAR,
            ]);

            $nameCIC_FRONT = 'admins_cic_front_'.$x.'-'.fake()->word();
            Image::create([
                'imageable_id' => $x,
                'imageable_type' => Admin::class,
                'link' => fake()->imageUrl(640, 480, 'cic_front', true),
                'name' => $nameCIC_FRONT,
                'type' => ImageEnum::CIC_FRONT,
            ]);

            $nameCIC_BACK = 'admins_cic_back_'.$x.'-'.fake()->word();
            Image::create([
                'imageable_id' => $x,
                'imageable_type' => Admin::class,
                'link' => fake()->imageUrl(640, 480, 'cic_back', true),
                'name' => $nameCIC_BACK,
                'type' => ImageEnum::CIC_BACK,
            ]);
        }
//        Vehicle
        for ($x = 1; $x <= 100; $x++) {
            $image_1 = 'vehicles_'.$x.'-'.fake()->word();
            Image::create([
                'imageable_id' => $x,
                'imageable_type' => Vehicle::class,
                'link' => fake()->imageUrl(640, 480, 'vehicle', true),
                'name' => $image_1,
                'type' => ImageEnum::VEHICLE_IMAGE,
            ]);

            $image_2 = 'vehciles_'.$x.'-'.fake()->word();
            Image::create([
                'imageable_id' => $x,
                'imageable_type' => Vehicle::class,
                'link' => fake()->imageUrl(640, 480, 'vehicle', true),
                'name' => $image_2,
                'type' => ImageEnum::VEHICLE_IMAGE,
            ]);
        }

        for ($x = 1; $x <= 100; $x++) {
            $image_1 = 'contracts_'.$x.'-'.fake()->word();
            Image::create([
                'imageable_id' => $x,
                'imageable_type' => Contract::class,
                'link' => fake()->imageUrl(640, 480, 'contract', true),
                'name' => $image_1,
                'type' => ImageEnum::CONTRACT_IMAGE,
            ]);

            $image_2 = 'contracts_'.$x.'-'.fake()->word();
            Image::create([
                'imageable_id' => $x,
                'imageable_type' => Contract::class,
                'link' => fake()->imageUrl(640, 480, 'contract', true),
                'name' => $image_2,
                'type' => ImageEnum::CONTRACT_IMAGE,
            ]);

        }
    }
}
