<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

'api' => [
    \Fruitcake\Cors\HandleCors::class,
    'throttle:api',
    \Illuminate\Routing\Middleware\SubstituteBindings::class,
],

Route::get('/user/{id}',[UserController::class,'getUser']);
Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);


