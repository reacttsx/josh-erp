<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\CustEnqController;
use App\Http\Controllers\CustFeedbackController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/create-admin', [AdminController::class, 'register']);
Route::post('/login', [AdminController::class, 'login']);
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::get('/logout', [AdminController::class, 'logout']);
    Route::post('/customer/create', [CustEnqController::class, 'add']);
    Route::get('/customer/get-all-enq', [CustEnqController::class, 'list']);
    Route::post('/customer/create-feedback', [CustFeedbackController::class, 'add']);
    Route::get('/customer/get-all-feedback', [CustFeedbackController::class, 'list']);
});
