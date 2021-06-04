<?php

namespace App\Services;

class ApiKeyService
{
    public function getApiKey()
    {
        return env('API_KEY');
    }
}

