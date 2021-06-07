<?php
namespace App\Models\JpGov;

use Illuminate\Support\Collection;

class CovidStatistics
{
    /**
     * calculate each death count from total
     *  and return death count and total for each day.
     *
     * @param array $data
     * @return Illuminate\Support\Collection
     */
    public static function getDeathCases(array $data): Collection
    {
        return collect($data)
            ->map(function($value, $index) use ($data) {
                $prevDeathCases = $index > 0 ? $data[$index - 1]['死亡者数'] : 0;
                return [
                    'date' => $value['日付'],
                    'count' => $value['死亡者数'] - $prevDeathCases,
                    'total' => $value['死亡者数'],
                ];
            });
    }

    /**
      * calculate each positive total
      *  and return positive count and total for each day.
      *
      * @param array $data
      * @return Illuminate\Support\Collection
      */
    public static function getPositiveCases(array $data): Collection
    {
        $totalPositiveCases = 0;
        return collect($data)
            ->map(function($value) use (&$totalPositiveCases) {
                $totalPositiveCases += $value['PCR 検査陽性者数(単日)'];
                return [
                    'date' => $value['日付'],
                    'count' => $value['PCR 検査陽性者数(単日)'],
                    'total' => $totalPositiveCases,
                ];
            });
    }

    /**
     * calclate each positive count from total
     *  and return severe count and total for each days
     *
     * @param array $data
     * @return Illuminate\Support\Collection
     */
    public static function getSevereCases(array $data): Collection
    {
        return collect($data)
            ->map(function($value, $index) use ($data) {
                return [
                    'date' => $value['日付'],
                    'total' => $value['重症者数'],
                ];
            });
    }

    /**
      * calculate each test total
      *  and return test count and total for each day.
      *
      * @param array $data
      * @return Illuminate\Support\Collection
      */
    public static function getTestCases(array $data): Collection
    {
        $totalTestCases = 0;
        return collect($data)
            ->map(function($value) use (&$totalTestCases) {
                $totalTestCases += $value['PCR 検査実施件数(単日)'];
                return [
                    'date' => $value['日付'],
                    'count' => $value['PCR 検査実施件数(単日)'],
                    'total' => $totalTestCases,
                ];
            });
    }
}

