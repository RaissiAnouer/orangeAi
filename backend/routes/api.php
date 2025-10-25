<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\GeminiController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::middleware('auth:sanctum')->group(function(){
Route::get('/user/{id}',[UserController::class,'getUser']);
Route::post('/chat',[GeminiController::class,'chat']);

});
Route::post('/register',[UserController::class,'register']);
Route::post('/login',[UserController::class,'login']);
Route::post('/googleLogin',[UserController::class,'googleLogin']);
Route::post('/googleRegister',[UserController::class,'googleRegister']);
