<?php

namespace App\Services;

use \GuzzleHttp\Client as HttpClient;
use Illuminate\Support\Collection;
use App\Models\JpGov\CovidStatistics;

class JpGovApiService
{
    /**
     * create an instance of JpGovApiService 
     *
     * @param ApiKeyService $apiKeyService
     # @return void
     */
    public function __construct(ApiKeyService $apiKeyService)
    {
        $this->apiKeyService = $apiKeyService;
        $this->apiRootUrl = 'https://api.opendata.go.jp/mhlw/';
    }

    /**
     * fetch death case data from api and get converted death cases data.
     *
     * @return Illuminate\Support\Collection
     */
    public function getDeathCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $client = new HttpClient(['base_uri' => $this->apiRootUrl]);
        $res = $client->request(
            'GET',
            'death-cases',
            ['query' => ['apikey' => $apiKey]]
        );
        $data = json_decode($res->getBody(), true);
        return CovidStatistics::getDeathCases($data);
    }
}

