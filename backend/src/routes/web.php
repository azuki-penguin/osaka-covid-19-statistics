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
    $router->get('death-cases', 'JpGovApiController@getDeathCases');
    $router->get('positive-cases', 'JpGovApiController@getPositiveCases');
    $router->get('severe-cases', 'JpGovApiController@getSevereCases');
    $router->get('test-cases', 'JpGovApiController@getTestCases');
});
