<?php

namespace App\Http\Controllers;

use Illuminate\Support\Collection;
use App\Services\JpGovApiService;

class JpGovApiController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @param JpGovApiService $apiService
     * @return void
     */
    public function __construct(JpGovApiService $apiService)
    {
        $this->apiService = $apiService;
    }

    /**
     * get death case count and total each day.
     *
     * @return Illuminate\Support\Collection
     */
    public function getDailyDeathCases(): Collection
    {
        return $this->apiService->getDailyDeathCases();
    }

    /**
     * get positive cases count and total each day.
     *
     * @return Illuminate\SUpport\Collection
     */
    public function getDailyPositiveCases(): Collection
    {
        return $this->apiService->getDailyPositiveCases();
    }

    /**
     * get severe cases count and total each day.
     *
     * @return Illuminate\SUpport\Collection
     */
    public function getDailySevereCases(): Collection
    {
        return $this->apiService->getDailySevereCases();
    }

    /**
     * get test cases count and total each day.
     *
     * @return Illuminate\SUpport\Collection
     */
    public function getDailyTestCases(): Collection
    {
        return $this->apiService->getDailyTestCases();
    }
}
