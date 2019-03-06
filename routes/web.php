<?php

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

Route::get('/', 'HomeController@index');
Route::get('/meals', 'HomeController@mealsListing');
Route::get('/cart', 'HomeController@cart');
Route::post('/addToCart', 'HomeController@updateCart')->name('updateCart');
Route::post('/applyCoupon', 'HomeController@applyCoupon')->name('applyCoupon');
Route::get('/checkout', 'HomeController@checkout')->name('checkout');
Route::post('/register', 'AuthController@store')->name('customer.register');
Route::get('/login', 'AuthController@index')->name('customer.login');
Route::get('/verifyEmail/{token}', 'AuthController@verifyToken')->name('verifyEmail');
Route::post('/login', 'AuthController@login')->name('post.login');
Route::middleware('auth:customer')->group(function() {
    Route::get('/myaccount', 'CustomerController@index')->name('customer.dashboard');
    Route::post('/myaccount/profile', 'CustomerController@updateProfile')->name('customer.updateProfile');
    Route::post('/myaccount', 'CustomerController@updatePassword')->name('customer.updatePassword');
    Route::get('/myaccount/addresses/single', 'CustomerController@singleAddress')->name('customer.singleAddress');
    Route::get('/myaccount/addresses', 'CustomerController@addresses')->name('customer.addresses');
    Route::post('/myaccount/addresses', 'CustomerController@addAddress')->name('customer.addAddress');
    Route::get('/myaccount/orders', 'CustomerController@orders')->name('customer.orders');
    Route::get('/myaccount/payments', 'CustomerController@payments')->name('customer.payments');
    Route::post('/myaccount/recurringstop', 'CustomerController@recurringstop')->name('payment.stop');
    Route::get('/logout', 'AuthController@logout')->name('customer.logout');
});
// Paypal Route
Route::post('paypal/create', 'PaymentController@doPayment')->name('payment.do');
Route::get('paypal/status', 'PaymentController@paypalStatus')->name('paypal.status');
Route::get('stripe/status', 'PaymentController@stripeStatus')->name('stripe.status');
Route::get('klarna/status', 'PaymentController@klarnaStatus')->name('klarna.status');
Route::get('sofort/status', 'PaymentController@sofort_response')->name('sofort.status');
Route::get('/email', 'PaymentController@Email');
Route::get('/email2', 'PaymentController@Email2');
Route::get('/email3', 'PaymentController@Email3');
Route::get('/email4', 'PaymentController@Email4');
Route::get('/stripe', 'PaymentController@stripe');


//Route::post('payment/cancel', 'PaymentController@cancel_autopayment')->name('payments.cancel');

// order invoice success page
Route::get('/invoice', 'HomeController@stripeinvoice');
Route::get('/invoice/{id}', 'HomeController@invoice')->name('payment.success');

Route::get('/{slug}', 'HomeController@mealSingle');
Route::get('page/{name}', 'HomeController@page');
