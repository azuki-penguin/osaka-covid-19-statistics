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

    /**
     * fetch positive case data from api
     *  and get converted positive cases data.
     *
     * @return Illuminate\Support\Collection
     */
    public function getPositiveCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $client = new HttpClient(['base_uri' => $this->apiRootUrl]);
        $res = $client->request(
            'GET',
            'positive-cases',
            ['query' => ['apikey' => $apiKey]],
        );
        $data = json_decode($res->getBody(), true);
        return CovidStatistics::getPositiveCases($data);
    }

    /**
     * fetch severe case data from api
     *  and get converted severe cases data.
     */
    public function getSevereCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $client = new HttpClient(['base_uri' => $this->apiRootUrl]);
        $res = $client->request(
            'GET',
            'severe-cases',
            ['query' => ['apikey' => $apiKey]],
        );
        $data = json_decode($res->getBody(), true);
        return CovidStatistics::getSevereCases($data);
    }

    /**
     * fetch test case data from api
     *  and get converted test cases data.
     *
     * @return Illuminate\Support\Collection
     */
    public function getTestCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $client = new HttpClient(['base_uri' => $this->apiRootUrl]);
        $res = $client->request(
            'GET',
            'test-cases',
            ['query' => ['apikey' => $apiKey]],
        );
        $data = json_decode($res->getBody(), true);
        return CovidStatistics::getTestCases($data);
    }
}

