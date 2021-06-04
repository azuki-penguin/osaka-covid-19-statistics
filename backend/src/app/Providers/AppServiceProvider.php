<?php

namespace App\Providers;

use Illuminate\Foundation\Application;
use Illuminate\Support\ServiceProvider;
use App\Services\ApiKeyService;
use App\Services\JpGovApiService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        $this->app
            ->singleton(ApiKeyService::class, function() {
              return new ApiKeyService()
            });
        $this->app
            ->singleton(JpGovApiService::class, function(Application $app) {
                $apiKeyService = $app->make(ApiKeyService::class);
                return JpGovApiService($apiKeyService);
            });

    }
}
