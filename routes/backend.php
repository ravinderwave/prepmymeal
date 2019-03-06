<?php

/*
|--------------------------------------------------------------------------
| Backend Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/login', 'AuthController@index')->name('backend.login');
Route::post('/login', 'AuthController@login')->name('login');
Route::middleware(['auth'])->group(function () {
	Route::get('/', 'DashboardController@index')->name('backend.dashboard');
	Route::get('/profile', 'DashboardController@profile')->name('profile');
	Route::get('/settings', 'DashboardController@settings')->name('settings');
	Route::post('/settings', 'DashboardController@storesettings')->name('storeSettings');
	Route::get('/logout', 'AuthController@logout')->name('logout');

	Route::resource('components','ComponentController');
	Route::resource('meals','MealController');
	Route::resource('users','UserController');
	Route::get('/users/address/{id}', 'UserController@address')->name('users.address');
	Route::resource('orders','OrderController');
	Route::resource('coupons','CouponController');
});

