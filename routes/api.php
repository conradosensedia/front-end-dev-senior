<?php

use App\Http\Controllers\Api\BoardController;
use App\Http\Controllers\Api\TaskController;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    Route::get('/boards', [BoardController::class, 'index']);
    Route::post('/boards', [BoardController::class, 'store']);
    Route::get('/boards/{id}', [BoardController::class, 'show']);

    Route::get('/boards/{boardId}/tasks', [TaskController::class, 'index']);
    Route::post('/tasks', [TaskController::class, 'store']);
    Route::patch('/tasks/{id}/status', [TaskController::class, 'updateStatus']);
    Route::delete('/tasks/{id}', [TaskController::class, 'destroy']);
});