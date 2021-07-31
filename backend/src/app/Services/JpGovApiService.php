<?php

namespace App\Services;

use \GuzzleHttp\Client as HttpClient;
use Illuminate\Support\Collection;
use App\Models\JpGov\CovidStatistics;

class JpGovApiService
{
    private ApiKeyService $apiKeyService;
    private CovidStatistics $covidStatistics;
    private HttpClient $httpClient;

    /**
     * create an instance of JpGovApiService 
     *
     * @param ApiKeyService $apiKeyService
     # @return void
     */
    public function __construct(ApiKeyService $apiKeyService)
    {
        $this->apiKeyService = $apiKeyService;
        $this->covidStatistics = new CovidStatistics();
        $apiRootUrl = 'https://api.opendata.go.jp/mhlw/';
        $this->httpClient = new HttpClient(['base_uri' => $apiRootUrl]);
    }

    /**
     * fetch death case data from api and get converted death cases data.
     *
     * @return Illuminate\Support\Collection
     */
    public function getDailyDeathCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $res = $this->httpClient->request(
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
        $res = $this->httpClient->request(
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
        $res = $this->httpClient->request(
            'GET',
            'positive-cases',
            ['query' => ['apikey' => $apiKey]],
        );
        $data = json_decode($res->getBody(), true);
        $this->covidStatistics->setPositiveCasesData($data);
        return $this->covidStatistics->getDailyPositiveCases();
    }

    /**
     * fetch positive case data from api and get converted weekly positive cases data.
     *
     * @return Illuminate\Support\Collection
     */
    public function getWeeklyPositiveCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $res = $this->httpClient->request(
            'GET',
            'positive-cases',
            ['query' => ['apikey' => $apiKey]]
        );
        $data = json_decode($res->getBody(), true);
        $this->covidStatistics->setPositiveCasesData($data);
        return $this->covidStatistics->getWeeklyPositiveCases();
    }

    /**
     * fetch severe case data from api
     *  and get converted severe cases data.
     */
    public function getDailySevereCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $res = $this->httpClient->request(
            'GET',
            'severe-cases',
            ['query' => ['apikey' => $apiKey]],
        );
        $data = json_decode($res->getBody(), true);
        $this->covidStatistics->setSevereCasesData($data);
        return $this->covidStatistics->getDailySevereCases();
    }

    /**
     * fetch positive case data from api
     *  and get converted weekly severe cases data.
     *
     * @return Illuminate\Support\Collection
     */
    public function getWeeklySevereCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $res = $this->httpClient->request(
            'GET',
            'severe-cases',
            ['query' => ['apikey' => $apiKey]],
        );
        $data = json_decode($res->getBody(), true);
        $this->covidStatistics->setSevereCasesData($data);
        return $this->covidStatistics->getWeeklySevereCases();
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
        $res = $this->httpClient->request(
            'GET',
            'test-cases',
            ['query' => ['apikey' => $apiKey]],
        );
        $data = json_decode($res->getBody(), true);
        $this->covidStatistics->setTestCasesData($data);
        return $this->covidStatistics->getDailyTestCases();
    }

    /**
     * fetch test case data from api
     *  and get converted weekly test cases data.
     *
     * @return Illuminate\Support\Collection
     */
    public function getWeeklyTestCases(): Collection
    {
        $apiKey = $this->apiKeyService->getApiKey();
        $res = $this->httpClient->request(
            'GET',
            'test-cases',
            ['query' => ['apikey' => $apiKey]],
        );
        $data = json_decode($res->getBody(), true);
        $this->covidStatistics->setTestCasesData($data);
        return $this->covidStatistics->getWeeklyTestCases();
    }
}

