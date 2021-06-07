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
    public function getDeathCases(): Collection
    {
        return $this->apiService->getDeathCases();
    }

    /**
     * get positive cases count and total each day.
     *
     * @return Illuminate\SUpport\Collection
     */
    public function getPositiveCases(): Collection
    {
        return $this->apiService->getPositiveCases();
    }

    /**
     * get severe cases count and total each day.
     *
     * @return Illuminate\SUpport\Collection
     */
    public function getSevereCases(): Collection
    {
        return $this->apiService->getSevereCases();
    }

    /**
     * get test cases count and total each day.
     *
     * @return Illuminate\SUpport\Collection
     */
    public function getTestCases(): Collection
    {
        return $this->apiService->getTestCases();
    }
}
