<?php

/** @var \Laravel\Lumen\Routing\Router $router */

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->group(['prefix' => 'api/jp'], function () use ($router) {
    $router->group(['prefix' => 'daily'], function () use ($router) {
        $router->get('death-cases', 'JpGovApiController@getDailyDeathCases');
        $router->get('positive-cases', 'JpGovApiController@getDailyPositiveCases');
        $router->get('severe-cases', 'JpGovApiController@getDailySevereCases');
        $router->get('test-cases', 'JpGovApiController@getDailyTestCases');
    });

    $router->group(['prefix' => 'weekly'], function() use ($router) {
        $router->get('death-cases', 'JpGovApiController@getWeeklyDeathCases');
        $router->get('positive-cases', 'JpGovApiController@getWeeklyPositiveCases');
    });
});

