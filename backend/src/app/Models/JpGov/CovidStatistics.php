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
}

