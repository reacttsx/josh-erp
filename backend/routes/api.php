<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AdvanceController;
use App\Http\Controllers\CustEnqController;
use App\Http\Controllers\CustFeedbackController;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\PaymentsController;
use App\Http\Controllers\PurchaseController;
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
    Route::patch('/customer/update', [CustEnqController::class, 'update']);
    Route::get('/customer/get-all-enq', [CustEnqController::class, 'list']);
    Route::get('/customer/all', [CustEnqController::class, 'listCustomer']);
    Route::post('/customer/create-feedback', [CustFeedbackController::class, 'add']);
    Route::get('/customer/get-all-feedback', [CustFeedbackController::class, 'list']);
    Route::post('/payments/create', [PaymentsController::class, 'add']);
    Route::get('/payments/all', [PaymentsController::class, 'list']);
    Route::post('/advance/create', [AdvanceController::class, 'add']);
    Route::get('/advance/all', [AdvanceController::class, 'list']);
    Route::post('/purchase/create', [PurchaseController::class, 'add']);
    Route::get('/purchase/all', [PurchaseController::class, 'list']);
    Route::get('/customer/search/{id}', [CustomerController::class, 'search']);
    Route::get('/customer/dashboard', [CustomerController::class, 'dashboard']);
});
