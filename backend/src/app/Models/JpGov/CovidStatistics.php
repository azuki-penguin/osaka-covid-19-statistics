<?php
namespace App\Models\JpGov;

use Illuminate\Support\Collection;

class CovidStatistics
{
    private Collection $deathCases;
    private Collection $positiveCases;
    private Collection $severeCases;
    private Collection $testCases;

    /**
     * calculate each death count from total for each day.
     *
     * @param array $data
     * @return void
     */
    public function setDeathCasesData(array $data): void
    {
        $this->deathCases = collect($data)
            ->map(function($value, $index) use ($data) {
                $prevDeathCases = $index > 0 ? intval($data[$index - 1]['死亡者数']) : 0;
                return [
                    'date' => new \DateTime($value['日付']),
                    'count' => intval($value['死亡者数']) - $prevDeathCases,
                    'total' => intval($value['死亡者数']),
                ];
            });
    }

    /**
     * return daily death count and total for each day.
     *
     * @return Illuminate\Support\Collection
     */
    public function getDailyDeathCases(): Collection
    {
        return $this->deathCases;
    }

    /**
     * return weekly death count and total for eachweeks.
     *
     * @return Illuminate\Support\Collection
     */
    public function getWeeklyDeathCases(): Collection
    {
        return $this->deathCases
            ->chunk(7)
            ->map(function($weekData) {
                return [
                    'period' => [
                        'begin' => $weekData->min('date'),
                        'end' => $weekData->max('date'),
                    ],
                    'average' => $weekData->average('count'),
                    'weeklyTotal' => $weekData->sum('count'),
                    'total' => $weekData->last()['total'],
                ];
            });
    }

    /**
     * calculate each positive total from count for each day.
     *
     * @param array $data
     * @return void
     */
    public function setPositiveCasesData(array $data): void
    {
        $totalPositiveCases = 0;
        $this->positiveCases = collect($data)
            ->map(function($value) use (&$totalPositiveCases) {
                $totalPositiveCases += intval($value['PCR 検査陽性者数(単日)']);
                return [
                    'date' => new \DateTime($value['日付']),
                    'count' => intval($value['PCR 検査陽性者数(単日)']),
                    'total' => $totalPositiveCases,
                ];
            });
    }

    /**
      * return daily positive count and total for each day.
      *
      * @return Illuminate\Support\Collection
      */
    public function getDailyPositiveCases(): Collection
    {
        return $this->positiveCases;
    }

    /**
     * return weekly positive count and total for eachweeks.
     *
     * @return Illuminate\Support\Collection
     */
    public function getWeeklyPositiveCases(): Collection
    {
        return $this->positiveCases
            ->chunk(7)
            ->map(function($weekData) {
                return [
                    'period' => [
                        'begin' => $weekData->min('date'),
                        'end' => $weekData->max('date'),
                    ],
                    'average' => $weekData->average('count'),
                    'weeklyTotal' => $weekData->sum('count'),
                    'total' => $weekData->last()['total'],
                ];
            });
    }

    /**
     * calclate each positive count from total for each days
     *
     * @param array $data
     * @return void
     */
    public function setSevereCasesData(array $data): void
    {
        $this->severeCases =  collect($data)
            ->map(function($value, $index) use ($data) {
                return [
                    'date' => new \DateTime($value['日付']),
                    'total' => intval($value['重症者数']),
                ];
            });
    }

    /**
     * return daily severe count and total for each days
     *
     * @return Illuminate\Support\Collection
     */
    public function getDailySevereCases(): Collection
    {
        return $this->severeCases;
    }

    /**
      * calculate each test count and total for each day.
      *
      * @param array $data
      * @return void
      */

    public function setTestCasesData(array $data): void
    {
        $totalTestCases = 0;
        $this->testCases =  collect($data)
            ->map(function($value) use (&$totalTestCases) {
                $totalTestCases += intval($value['PCR 検査実施件数(単日)']);
                return [
                    'date' => new \DateTime($value['日付']),
                    'count' => intval($value['PCR 検査実施件数(単日)']),
                    'total' => $totalTestCases,
                ];
            });
    }

    /**
      * return test count and total for each day.
      *
      * @return Illuminate\Support\Collection
      */
    public function getDailyTestCases(): Collection
    {
        return $this->testCases;
    }
}

