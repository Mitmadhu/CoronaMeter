<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\VaccineController;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

//route for home page
Route::get('/home', [HomeController::class, 'showHome']);

//route for dashboard page
Route::get('/dashboard', [HomeController::class, 'showDashboard']);

//route for showing each state details

Route::get('/state/{stateName}', [HomeController::class, 'viewState']);

//User controller signup
Route::get('/signup', [UserController::class, 'showSignup']);


Route::get('/vaccine', [VaccineController::class, 'showVaccineRecord']);
