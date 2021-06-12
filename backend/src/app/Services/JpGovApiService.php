<?php

namespace App\Services;

use \GuzzleHttp\Client as HttpClient;
use Illuminate\Support\Collection;
use App\Models\JpGov\CovidStatistics;

class JpGovApiService
{
    private ApiKeyService $apiKeyService;
    private string $apiRootUrl;
    private CovidStatistics $covidStatistics;

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
        $this->covidStatistics = new CovidStatistics();
    }

    /**
     * fetch death case data from api and get converted death cases data.
     *
     * @return Illuminate\Support\Collection
     */
    public function getDailyDeathCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $client = new HttpClient(['base_uri' => $this->apiRootUrl]);
        $res = $client->request(
            'GET',
            'death-cases',
            ['query' => ['apikey' => $apiKey]]
        );
        $data = json_decode($res->getBody(), true);
        $this->covidStatistics->setDeathCasesData($data);
        return $this->covidStatistics->getDailyDeathCases();
    }

    /**
     * fetch death case data from api and get converted weekly death cases data.
     *
     * @return Illuminate\Support\Collection
     */
    public function getWeeklyDeathCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $client = new HttpClient(['base_uri' => $this->apiRootUrl]);
        $res = $client->request(
            'GET',
            'death-cases',
            ['query' => ['apikey' => $apiKey]]
        );
        $data = json_decode($res->getBody(), true);
        $this->covidStatistics->setDeathCasesData($data);
        return $this->covidStatistics->getWeeklyDeathCases();
    }

    /**
     * fetch positive case data from api
     *  and get converted positive cases data.
     *
     * @return Illuminate\Support\Collection
     */
    public function getDailyPositiveCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $client = new HttpClient(['base_uri' => $this->apiRootUrl]);
        $res = $client->request(
            'GET',
            'positive-cases',
            ['query' => ['apikey' => $apiKey]],
        );
        $data = json_decode($res->getBody(), true);
        $this->covidStatistics->setPositiveCasesData($data);
        return $this->covidStatistics->getDailyPositiveCases();
    }

    /**
     * fetch severe case data from api
     *  and get converted severe cases data.
     */
    public function getDailySevereCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $client = new HttpClient(['base_uri' => $this->apiRootUrl]);
        $res = $client->request(
            'GET',
            'severe-cases',
            ['query' => ['apikey' => $apiKey]],
        );
        $data = json_decode($res->getBody(), true);
        $this->covidStatistics->setSevereCasesData($data);
        return $this->covidStatistics->getDailySevereCases();
    }

    /**
     * fetch test case data from api
     *  and get converted test cases data.
     *
     * @return Illuminate\Support\Collection
     */
    public function getDailyTestCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $client = new HttpClient(['base_uri' => $this->apiRootUrl]);
        $res = $client->request(
            'GET',
            'test-cases',
            ['query' => ['apikey' => $apiKey]],
        );
        $data = json_decode($res->getBody(), true);
        $this->covidStatistics->setTestCasesData($data);
        return $this->covidStatistics->getDailyTestCases();
    }
}

