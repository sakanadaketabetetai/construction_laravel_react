<?php

namespace App\Interfaces;
use App\Repositories\UserRepository;

interface UserRepositoryInterface
{
    public function createUser(array $data);
}
