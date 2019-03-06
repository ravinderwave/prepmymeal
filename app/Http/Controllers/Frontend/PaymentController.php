<?php

namespace App\Http\Controllers\frontend;

use App\Http\Controllers\Controller;

use App\Mail\SendCaMail;
use App\Mail\SendMailable;
use App\Mail\OrderInvoiceMail;
use App\Mail\upsMail;
use App\Option;
use App\Order;
use Illuminate\Http\Request;
use App\Component;
use App\Meal;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use MyOnlineStore\Omnipay\KlarnaCheckout\Gateway as Klarna;
use Omnipay\Omnipay;
use Omnipay\Common\CreditCard;
use Cartalyst\Stripe\Stripe;
use Validator;
use Redirect;
use Session;
use Input;
use URL;
use Notify;


/** All Paypal Details class **/


use App\Customer;
use App\Address;


class PaymentController extends Controller
{
    /**
     * Store a details of payment with paypal.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */


    public function doPayment(Request $request)
    {
        if ($request->paymentMethod == 'paypal') {
            try {
                $paypal = Omnipay::create('PayPal_Rest');


                // Initialise the gateway
                $paypal->initialize(array(
                    'clientId' => env('PAYPAL_CLIENT_ID'),
                    'secret' => env('PAYPAL_SECRET'),
                ));

                $paypal->setTestMode(true);
                $siteOptions = Option::first();


                // Adding cart item into paypal item list
                $txn_data['address_id'] = 0;
                if (Auth::guard('customer')->check()) {

                    $customer_id = Auth::guard('customer')->user()->id;

                } else {
                    $isCustomerExist = Customer::where('email', '=', $request->email)->first();
                    if ($isCustomerExist) {
                        Notify::error('Validtion failed', $title = 'Email id is already Registered . login with email and password');

                        return redirect()->route('customer.login');
                    }
                    $customer = new Customer;
                    $customer->username = $request->firstName;
                    $customer->name = $request->firstName;
                    $customer->email = $request->email;
                    $customer->save();
                    $customer_id = $customer->id;


                    $address = new Address;
                    $address->customer_id = $customer_id;
                    $address->address = $request->address;
                    $address->city = $request->city;
                    $address->state = $request->state;
                    $address->zip = $request->zip;
                    $address->status = '1';
                    $address->save();
                    $address_id = $address->id;
                }

                // Auth::guard('customer')->user()->id;
                $txn_data = array('total' => 0, 'sub_total' => 0, 'customer_id' => $customer_id, 'sub_tax' => 0);

                if (session()->has('cart')) {
                    $cart = session('cart');
                    $ids = array_keys($cart);

                    $meals = Meal::whereIn('id', $ids)->get();

                    $tax_type = $siteOptions->vat_tax;

                    foreach ($meals as $key => $meal) {
                        if ($meal->type == 2) {
                            $tax_type = $siteOptions->drink_vat_tax;
                        }

                        $item_price = ($cart[$meal->id]['qty'] * $meal->price);
                        $item_tax = (($item_price / 100) * $tax_type);

                        $txn_data['items'][] = [
                            'meal_id' => $meal->id,
                            'name' => $meal->title,
                            'currency' => 'USD',
                            'quantity' => $cart[$meal->id]['qty'],
                            'sku' => $meal->sku,
                            'price' => round($item_price, 2),
                            'tax' => round($item_tax, 1),
                            'mealInfo' => $meal
                        ];
                        $txn_data['sub_total'] += $item_price;

                        $txn_data['sub_tax'] += $item_tax;


                    }
                }

                if (isset($cart['coupon'])) {
                    $couponInfo = Coupon::find($cart['coupon']);

                    $txn_data['coupon'] = json_encode($couponInfo);
                }
                $txn_data['total'] = round($cart['grandTotal'], 2);

                if ($request->has('address_id')) {


                    $txn_data['address_id'] = $request->input('address_id');
                } else {
                    $address = new Address;
                    $address->customer_id = $customer_id;
                    $address->address = $request->address;
                    $address->city = $request->city;
                    $address->state = $request->state;
                    $address->zip = $request->zip;
                    $address->status = '1';
                    $address->save();
                    $txn_data['address_id'] = $address->id;
                }

                $txn_data['payment_mode'] = $request->input('paymentMethod');
                $purchase = $paypal->purchase(array(
                    'currency' => 'USD',
                    'amount' => $txn_data['total'],
                    'custom' => 12,
                    'description' => 'Meal Purchase',
                    'returnUrl' => URL::route('paypal.status'),
                    'cancelUrl' => URL::route('paypal.status'),
                ));

                //     $txnId = uniqid();


                $response = $purchase->send();
                $paymentId = $response->getTransactionReference();


                DB::table('transaction')->insert(['paymentId' => $paymentId, 'customer_id' => $customer_id, 'txn_data' => json_encode($txn_data), 'status' => 'processing', 'created_at' => now()]);

                // redirect to $response->getRedirectUrl()
                $response->redirect();
                //  dd($response->getMessage());


            } catch (\Exception $e) {
                // internal error, log exception and display a generic message to the customer
                exit($e->getMessage());
            }
        } elseif ($request->paymentMethod == 'klarna') {

            $gateway = Omnipay::create('\MyOnlineStore\Omnipay\KlarnaCheckout\Gateway');

            $gateway->initialize([
                'username' => env('KLARNA_USERNAME'),
                'secret' => env('KLARNA_PASSWORD'),
                'api_region' => 'DE', // Optional, may be Gateway::API_VERSION_EUROPE (default) or Gateway::API_VERSION_NORTH_AMERICA
                'testMode' => true // Optional, default: true
            ]);
            $data = [
                'amount' => 100,
                'tax_amount' => 20,
                'currency' => 'EUR',
                'locale' => 'DE',
                'purchase_country' => 'DE',
                'notify_url' => URL::route('klarna.status'), // https://developers.klarna.com/api/#checkout-api__ordermerchant_urls__validation
                'return_url' => URL::route('klarna.status'), // https://developers.klarna.com/api/#checkout-api__ordermerchant_urls__checkout
                'terms_url' => URL::route('klarna.status'), // https://developers.klarna.com/api/#checkout-api__ordermerchant_urls__terms
                'validation_url' => URL::route('klarna.status'), // https://developers.klarna.com/api/#checkout-api__ordermerchant_urls__validation
                'items' => [
                    [
                        'type' => 'physical',
                        'name' => 'Shirt',
                        'quantity' => 1,
                        'tax_rate' => 25,
                        'price' => 100,
                        'unit_price' => 100,
                        'total_tax_amount' => 20,
                    ],
                ],
            ];
            try {
                $response = $gateway->authorize($data)->send()->getData();
            } catch (\Exception $e) {
                dd($e->getMessage());

            }

        } elseif ($request->paymentMethod == 'stripe') {

            if ($request->has('stripeToken')) {
                try {
                    // Setup payment gateway
                    $stripe = Omnipay::create('Stripe');
                    $stripe->setApiKey(env('STRIPE_SECRET_KEY'));

                    $stripe->setTestMode(true);
                    $siteOptions = Option::first();


                    // Adding cart item into paypal item list
                    $txn_data['address_id'] = 0;
                    if (Auth::guard('customer')->check()) {

                        $customer_id = Auth::guard('customer')->user()->id;

                    } else {
                        $isCustomerExist = Customer::where('email', '=', $request->email)->first();
                        if ($isCustomerExist) {
                            Notify::error('Validtion failed', $title = 'Email id is already Registered . login with email and password', $options = ['delay'
                            => 3600]);

                            return redirect()->route('customer.login');
                        }
                        $customer = new Customer;
                        $customer->username = $request->firstName;
                        $customer->name = $request->firstName;
                        $customer->email = $request->email;
                        $customer->save();
                        $customer_id = $customer->id;

                        $address = new Address;
                        $address->customer_id = $customer_id;
                        $address->address = $request->address;
                        $address->city = $request->city;
                        $address->state = $request->state;
                        $address->zip = $request->zip;
                        $address->status = '1';
                        $address->save();
                        $address_id = $address->id;
                    }

                    $txn_data = array('total' => 0, 'sub_total' => 0, 'customer_id' => $customer_id, 'sub_tax' => 0);

                    if (session()->has('cart')) {
                        $cart = session('cart');
                        $ids = array_keys($cart);

                        $meals = Meal::whereIn('id', $ids)->get();
                        foreach ($meals as $key => $meal) {
                            $item_price = ($cart[$meal->id]['qty'] * $meal->price);
                            $item_tax = (($item_price / 100) * $siteOptions->vat_tax);
                            $txn_data['items'][] = [
                                'meal_id' => $meal->id,
                                'name' => $meal->title,
                                'currency' => 'USD',
                                'quantity' => $cart[$meal->id]['qty'],
                                'sku' => $meal->sku,
                                'price' => round($item_price, 2),
                                'tax' => round($item_tax, 1),
                                'mealInfo' => $meal
                            ];
                            $txn_data['sub_total'] += $item_price;
                            $txn_data['sub_tax'] += $item_tax;
                        }
                    }
                    $txn_data['total'] = round($txn_data['sub_total'] + $txn_data['sub_tax'] + $siteOptions->shipping_tax, 2);

                    if ($request->has('address_id')) {

                        $txn_data['address_id'] = $request->input('address_id');
                    } else {
                        $address = new Address;
                        $address->customer_id = $customer_id;
                        $address->address = $request->address;
                        $address->city = $request->city;
                        $address->state = $request->state;
                        $address->zip = $request->zip;
                        $address->status = '1';
                        $address->save();
                        $txn_data['address_id'] = $address->id;
                    }

                    $txn_data['payment_mode'] = $request->input('paymentMethod');
                    $stripToken = $request->stripeToken;
                    // Send purchase request

                    $purchase = $stripe->purchase(array(
                        'currency' => 'USD',
                        'amount' => $txn_data['total'],
                        'token' => $stripToken,
                        'description' => 'Meal Purchase',
                        'returnUrl' => URL::route('paypal.status'),
                        'cancelUrl' => URL::route('paypal.status'),
                    ));

                    $response = $purchase->send();
                    $paymentId = $response->getTransactionReference();
                    $transactionId = DB::table('transaction')
                        ->insertGetId(['paymentId' => $paymentId, 'customer_id' => $customer_id, 'txn_data' => json_encode($txn_data), 'status' => 'processing', 'created_at' => now()]);

                    // Process response
                    if ($response->isSuccessful()) {

                        $this->stripeStatus($response);
                        return redirect()->route('payment.success', ['id' => $transactionId]);

                    } elseif ($response->isRedirect()) {

                        // Redirect to offsite payment gateway
                        $response->redirect();


                    } else {

                        // Payment failed
                        echo $response->getMessage();
                    }
                } catch (\Exception $e) {
                    dd($e->getMessage());
                }
            }
        } elseif ($request->paymentMethod == 'recurring') {

            if ($request->has('stripeToken')) {
                try {
                    // Setup payment gateway
                    $stripe = Omnipay::create('Stripe');
                    $stripe->setApiKey(env('STRIPE_SECRET'));

                    $stripe->setTestMode(true);
                    $siteOptions = Option::first();
                    
                    $stripe_dev = Stripe::make(env('STRIPE_SECRET'));

                    // Adding cart item into paypal item list
                    $txn_data['address_id'] = 0;
                    if (Auth::guard('customer')->check()) {

                        $customer_id = Auth::guard('customer')->user()->id;
                        
                        $email = Auth::guard('customer')->user()->email;

                    } else {
                        $isCustomerExist = Customer::where('email', '=', $request->email)->first();
                        if ($isCustomerExist) {
                            Notify::error('Validtion failed', $title = 'Email id is already Registered . login with email and password', $options = ['delay'
                            => 3600]);

                            return redirect()->route('customer.login');
                        }
                        $email = $request->email;
                        
                        $customer = new Customer;
                        $customer->username = $request->firstName;
                        $customer->name = $request->firstName;
                        $customer->email = $request->email;
                        $customer->save();
                        $customer_id = $customer->id;

                        $address = new Address;
                        $address->customer_id = $customer_id;
                        $address->address = $request->address;
                        $address->city = $request->city;
                        $address->state = $request->state;
                        $address->zip = $request->zip;
                        $address->status = '1';
                        $address->save();
                        $address_id = $address->id;
                    }

                    $txn_data = array('total' => 0, 'sub_total' => 0, 'customer_id' => $customer_id, 'sub_tax' => 0);

                    if (session()->has('cart')) {
                        $cart = session('cart');
                        $ids = array_keys($cart);

                        $meals = Meal::whereIn('id', $ids)->get();
                        foreach ($meals as $key => $meal) {
                            $item_price = ($cart[$meal->id]['qty'] * $meal->price);
                            $item_tax = (($item_price / 100) * $siteOptions->vat_tax);
                            $txn_data['items'][] = [
                                'meal_id' => $meal->id,
                                'name' => $meal->title,
                                'currency' => 'USD',
                                'quantity' => $cart[$meal->id]['qty'],
                                'sku' => $meal->sku,
                                'price' => round($item_price, 2),
                                'tax' => round($item_tax, 1),
                                'mealInfo' => $meal
                            ];
                            $txn_data['sub_total'] += $item_price;
                            $txn_data['sub_tax'] += $item_tax;
                        }
                    }
                    $txn_data['total'] = round($txn_data['sub_total'] + $txn_data['sub_tax'] + $siteOptions->shipping_tax, 2);

                    if ($request->has('address_id')) {

                        $txn_data['address_id'] = $request->input('address_id');
                    } else {
                        $address = new Address;
                        $address->customer_id = $customer_id;
                        $address->address = $request->address;
                        $address->city = $request->city;
                        $address->state = $request->state;
                        $address->zip = $request->zip;
                        $address->status = '1';
                        $address->save();
                        $txn_data['address_id'] = $address->id;
                    }

                    $txn_data['payment_mode'] = $request->input('paymentMethod');
                    $stripToken = $request->stripeToken;
                    // Send purchase request
                    $sprice=$txn_data['total'];
                    
                    Session::push('txn_data',$txn_data);

                    $date= date('d-m');
                    
                    $rand = rand(0000, 9999);

                    $subscription = $request->recurring_cycle;
                    if($subscription == 'daily'){
                        $plan_interval = 'day';
                    }elseif($subscription == 'weekly'){
                        $plan_interval = 'week';
                    }elseif($subscription == 'monthly'){
                        $plan_interval = 'month';
                    }
                    $plan_name = $subscription.' Meal Purchase'.$date.''.$rand;
                    $plan_id = $date.'-'.$subscription.'-Purchase-'.$customer_id.'-'.$rand;
 
                    \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
                        
                        try{
                            \Stripe\Plan::create([
                                "amount" => $txn_data['total']*100,
                                "interval" => $plan_interval,
                                "product" => [
                                  "name" => $plan_name
                                ],
                                "currency" => "usd",
                                "id" => $plan_id
                          ]);
                            
                            try {

                                $customer = Customer::find($customer_id);
                                $result = $customer->newSubscription($plan_id, $plan_id)->create($stripToken);
                                
                                $paymentId = $result->invoice_id;
                                
                                $status = $result->status;
                                
                                $response = array(
                                    'id' => $paymentId,
                                    'status' => $status
                                );
                                $transactionId = DB::table('transaction')
                                    ->insertGetId(['paymentId' => $paymentId, 'customer_id' => $customer_id, 'txn_data' => json_encode($txn_data), 'status' => 'processing', 'created_at' => now()]);

                                $this->stripeStatus1($response);
                                
                                return redirect()->route('payment.success', ['id' => $transactionId]);
                            }catch (\Exception $ex) {
                                return $ex->getMessage();
                            }
                        } catch (Exception $ex) {
                            dd($e->getMessage());
                        }

                } catch (\Exception $e) {
                    dd($e->getMessage());
                }
            }
        }elseif ($request->paymentMethod == 'bank') {
            try {
                \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
                
                $siteOptions = Option::first();

                // Adding cart item into paypal item list
                $txn_data['address_id'] = 0;
                if (Auth::guard('customer')->check()) {

                    $customer_id = Auth::guard('customer')->user()->id;

                    $email = Auth::guard('customer')->user()->email;

                } else {
                    $isCustomerExist = Customer::where('email', '=', $request->email)->first();
                    if ($isCustomerExist) {
                        Notify::error('Validtion failed', $title = 'Email id is already Registered . login with email and password', $options = ['delay'
                        => 3600]);

                        return redirect()->route('customer.login');
                    }
                    $email = $request->email;

                    $customer = new Customer;
                    $customer->username = $request->firstName;
                    $customer->name = $request->firstName;
                    $customer->email = $request->email;
                    $customer->save();
                    $customer_id = $customer->id;

                    $address = new Address;
                    $address->customer_id = $customer_id;
                    $address->address = $request->address;
                    $address->city = $request->city;
                    $address->state = $request->state;
                    $address->zip = $request->zip;
                    $address->status = '1';
                    $address->save();
                    $address_id = $address->id;
                }

                $txn_data = array('total' => 0, 'sub_total' => 0, 'customer_id' => $customer_id, 'sub_tax' => 0);

                if (session()->has('cart')) {
                    $cart = session('cart');
                    $ids = array_keys($cart);

                    $meals = Meal::whereIn('id', $ids)->get();
                    foreach ($meals as $key => $meal) {
                        $item_price = ($cart[$meal->id]['qty'] * $meal->price);
                        $item_tax = (($item_price / 100) * $siteOptions->vat_tax);
                        $txn_data['items'][] = [
                            'meal_id' => $meal->id,
                            'name' => $meal->title,
                            'currency' => 'USD',
                            'quantity' => $cart[$meal->id]['qty'],
                            'sku' => $meal->sku,
                            'price' => round($item_price, 2),
                            'tax' => round($item_tax, 1),
                            'mealInfo' => $meal
                        ];
                        $txn_data['sub_total'] += $item_price;
                        $txn_data['sub_tax'] += $item_tax;
                    }
                }
                $txn_data['total'] = round($txn_data['sub_total'] + $txn_data['sub_tax'] + $siteOptions->shipping_tax, 2);

                if ($request->has('address_id')) {

                    $txn_data['address_id'] = $request->input('address_id');
                } else {
                    $address = new Address;
                    $address->customer_id = $customer_id;
                    $address->address = $request->address;
                    $address->city = $request->city;
                    $address->state = $request->state;
                    $address->zip = $request->zip;
                    $address->status = '1';
                    $address->save();
                    $txn_data['address_id'] = $address->id;
                }

                $txn_data['payment_mode'] = $request->input('paymentMethod');
                $stripToken = $request->stripeToken;
                // Send purchase request
                $sprice=$txn_data['total'];
                //echo $sprice; die;
                Session::push('txn_data',$txn_data);

                $source = \Stripe\Source::create([
                    "type" => "sofort",
                    "amount" => $sprice*100,
                    "currency" => "eur",
                    "statement_descriptor" => "Meal Order",
                    "redirect" => [
                        "return_url" => route('sofort.status')
                    ],
                    "sofort" => [
                       "country" => 'DE' 
                    ]
                ]);
                
                try{
                    $customer = \Stripe\Customer::create([
                        "email" => $email,
                        "source" => $source->id,
                    ]);
                    
                    $paymentId = rand(0000, 1111);

                    $transactionId = DB::table('transaction')
                        ->insertGetId(['paymentId' => $paymentId, 'customer_id' => $customer_id, 'txn_data' => json_encode($txn_data), 'status' => 'processing', 'created_at' => now()]);

                    session(['customer_object' => $customer->id, 'transaction_id' => $transactionId, 'price' => $sprice]);

                    $hook_url = $customer['sources']['data'][0]['redirect']['url'];
                    
                    //Session::flush();

                    return Redirect::to($hook_url);
                    
                } catch (Exception $ex) {
                    return $ex->getMessage();
                }
            }catch(Exception $ex) {
                return $ex->getMessage();
            }
        }else {
            exit('In-valid payment method selected ');
        }


    }

    public
    function paypalStatus(Request $request)
    {

        if ($request->paymentId != '' && $request->PayerID != '' && $request->token != '') {
            try {
                $paypal = Omnipay::create('PayPal_Rest');

                // Initialise the gateway
                $paypal->initialize(array(
                    'clientId' => env('PAYPAL_CLIENT_ID'),
                    'secret' => env('PAYPAL_SECRET'),
                ));

                $paypal->setTestMode(true);

                $txnInfo = DB::table('transaction')->where('paymentId', '=', $request->paymentId)->where('status', '=', 'processing')->first();
                if ($txnInfo) {
                    $txnData = json_decode($txnInfo->txn_data);

                    $completePurchase = $paypal->completePurchase(array(
                        'transactionReference' => $request->paymentId,
                        'payerId' => $request->PayerID,
                    ));

                    $response = $completePurchase->send();

//                    dd($response->getData());

                    if ($response) {

                        $transactionResponse['txn_response'] = json_encode($response);
                        $responseData = json_decode(json_encode($response->getData()));

                        if ($response->getCode() == 200) {


                            if ($responseData->state == 'approved') {
                                $transactionResponse['status'] = 'success';

                                // generating order


                                $orderInfo = [

                                    'customer_id' => $txnInfo->customer_id,
                                    'address_id' => $txnData->address_id,
                                    'tax' => $txnData->sub_tax,
                                    'sub_total' => $txnData->sub_total,
                                    'order_total' => $txnData->total,
                                    'payment_mode' => $txnData->payment_mode,
                                    'txn_id' => $txnInfo->id,
                                    'created_at' => date('Y-m-d h:i:s')

                                ];
                                $orderId = DB::table('orders')->insertGetId($orderInfo);
                                foreach ($txnData->items as $index => $item) {
                                    // save order meta data
                                    $orderMeal = [
                                        'orders_id' => $orderId,
                                        'meals_id' => $item->meal_id,
                                    ];
                                    DB::table('orders_meals')->insert($orderMeal);

                                }

                                if($txnInfo->coupon){

                                    $couponInfo = json_decode($txnInfo->coupon);
                                    DB::table('coupon_usage')
                                        ->where('used_by', '=', $txnInfo->customer_id)
                                        ->where('coupon_id', '=', $couponInfo->id)
                                        ->update(['order_id' => $orderId]);

                                    Coupon::find($couponInfo->id)->increment('usage_count');
                                }


                                $this->sendOrderEmails($txnData->id);

                                Notify::success("Your Order id : $orderId", $title = 'Order successfully place');


                            } else {
                                $transactionResponse['status'] = $responseData->state;
                            }


                        } else {
                            $transactionResponse['status'] = $responseData->state;

                        }
                    } else {
                        $transactionResponse['status'] = 'No response';
                    }

                    //  dd($response);

                    DB::table('transaction')
                        ->where('id', '=', $txnInfo->id)
                        ->update($transactionResponse);
                    $request->session()->forget('cart');
                    return redirect()->route('payment.success', ['id' => $txnInfo->id]);
                } else {
                    exit('In-valid Txn');
                }

            } catch (\Exception $e) {
                // internal error, log exception and display a generic message to the customer
                exit($e->getMessage());
            }

        }

    }
    
    public function stripeStatus($response)
    {


        try {


            if ($response) {
                $responseData = json_decode(json_encode($response->getData()));
                $txnInfo = DB::table('transaction')->where('paymentId', '=', $responseData->id)->where('status', '=', 'processing')->first();
                if ($txnInfo) {
                    $txnData = json_decode($txnInfo->txn_data);

                    $transactionResponse['txn_response'] = json_encode($response);
                    if ($responseData->status == 'succeeded') {
                        $transactionResponse['status'] = 'success';

                        // generating order


                        $orderInfo = [

                            'customer_id' => $txnInfo->customer_id,
                            'address_id' => $txnData->address_id,
                            'tax' => $txnData->sub_tax,
                            'sub_total' => $txnData->sub_total,
                            'order_total' => $txnData->total,
                            'payment_mode' => $txnData->payment_mode,
                            'txn_id' => $txnInfo->id,
                            'created_at' => date('Y-m-d h:i:s')

                        ];
                        $orderId = DB::table('orders')->insertGetId($orderInfo);
                        foreach ($txnData->items as $index => $item) {
                            // save order meta data
                            $orderMeal = [
                                'orders_id' => $orderId,
                                'meals_id' => $item->meal_id,
                            ];
                            DB::table('orders_meals')->insert($orderMeal);
                        }
                        if($txnInfo->coupon){

                            $couponInfo = json_decode($txnInfo->coupon);
                            DB::table('coupon_usage')
                                ->where('used_by', '=', $txnInfo->customer_id)
                                ->where('coupon_id', '=', $couponInfo->id)
                                ->update(['order_id' => $orderId]);

                            Coupon::find($couponInfo->id)->increment('usage_count');
                        }
                        $this->sendOrderEmails($txnInfo->id);
                        Notify::success("Your Order id : $orderId", $title = 'Order successfully place', $options = ['delay' => 3600]);

                        Log::info('4');

                    } else {
                        $transactionResponse['status'] = $responseData->status;
                    }
                } else {
                    $transactionResponse['status'] = 'No response';
                }

                //  dd($response);
                $transactionResponse['updated_at'] = now();

                DB::table('transaction')
                    ->where('id', '=', $txnInfo->id)
                    ->update($transactionResponse);

                session()->forget('cart');
            } else {
                exit('In-valid Txn');
            }

        } catch (\Exception $e) {
            // internal error, log exception and display a generic message to the customer
            exit($e->getMessage());
        }
    }
    
    public function stripeStatus1($response)
    {
        try {
            if ($response) {
                //$responseData = json_decode(json_encode($response->getData()));
                //print_r($response);die;
                $txnInfo = DB::table('transaction')->where('paymentId', '=', $response['id'])->where('status', '=', 'processing')->first();
                if ($txnInfo) {
                    $txnData = json_decode($txnInfo->txn_data);

                    $transactionResponse['txn_response'] = json_encode($response);
                    if ($response['status'] == 'active') {
                        $transactionResponse['status'] = 'success';
                        // generating order

                        $orderInfo = [

                            'customer_id' => $txnInfo->customer_id,
                            'address_id' => $txnData->address_id,
                            'tax' => $txnData->sub_tax,
                            'sub_total' => $txnData->sub_total,
                            'order_total' => $txnData->total,
                            'payment_mode' => $txnData->payment_mode,
                            'txn_id' => $txnInfo->id,
                            'created_at' => date('Y-m-d h:i:s')

                        ];
                        $orderId = DB::table('orders')->insertGetId($orderInfo);
                        foreach ($txnData->items as $index => $item) {
                            // save order meta data
                            $orderMeal = [
                                'orders_id' => $orderId,
                                'meals_id' => $item->meal_id,
                            ];
                            DB::table('orders_meals')->insert($orderMeal);
                        }
                        
                        $this->sendOrderEmails($txnInfo->id);
                        Notify::success("Your Order id : $orderId", $title = 'Order successfully place', $options = ['delay' => 3600]);

                        //echo 'done';die;
                        
                        Log::info('4');

                    } else {
                        $transactionResponse['status'] = $response->status;
                    }
                } else {
                    $transactionResponse['status'] = 'No response';
                }

                //  dd($response);
                $transactionResponse['updated_at'] = now();

                DB::table('transaction')
                    ->where('id', '=', $txnInfo->id)
                    ->update($transactionResponse);

                session()->forget('cart');
            } else {
                exit('In-valid Txn');
            }

        } catch (\Exception $e) {
            // internal error, log exception and display a generic message to the customer
            exit($e->getMessage());
        }
    }
	
    public function sofort_response(Request $request){
        try{
            \Stripe\Stripe::setApiKey(env('STRIPE_SECRET'));
            $source = \Stripe\Source::retrieve($request->source);
            if($source->status == 'chargeable'){
                $customer = session()->get('customer_object');

                $charge = \Stripe\Charge::create([
                    "amount" => session()->get('price')*100,
                    "currency" => "eur",
                    "customer" => $customer,
                    "source" => $_GET['source'],
                ]);

                if($charge->captured == '1'){
                    $update = DB::table('transaction')->where('id', session()->get('transaction_id'))->update(array('paymentId' => $charge->id));

                    $txnInfo = DB::table('transaction')->where('paymentId', '=', $charge->id)->where('status', '=', 'processing')->first();
                    if ($txnInfo) {
                        $txnData = json_decode($txnInfo->txn_data);

                        $transactionResponse['txn_response'] = json_encode($charge->outcome);

                        if ($charge->captured == '1') {
                            $transactionResponse['status'] = 'success';

                            $orderInfo = [
                                'customer_id' => $txnInfo->customer_id,
                                'address_id' => $txnData->address_id,
                                'tax' => $txnData->sub_tax,
                                'sub_total' => $txnData->sub_total,
                                'order_total' => $txnData->total,
                                'payment_mode' => $txnData->payment_mode,
                                'txn_id' => $txnInfo->id,
                                'created_at' => date('Y-m-d h:i:s')
                            ];
                            $orderId = DB::table('orders')->insertGetId($orderInfo);
                            foreach ($txnData->items as $index => $item) {
                                // save order meta data
                                $orderMeal = [
                                    'orders_id' => $orderId,
                                    'meals_id' => $item->meal_id,
                                ];
                                DB::table('orders_meals')->insert($orderMeal);
                            }

                            $this->sendOrderEmails($txnInfo->id);
                            Notify::success("Your Order id : $orderId", $title = 'Order successfully place', $options = ['delay' => 3600]);

                            Log::info('4');
                        } else {
                            $transactionResponse['status'] = $charge->captured;
                        }
                    } else {
                        $transactionResponse['status'] = 'No response';
                    }

                    //  dd($response);
                    $transactionResponse['updated_at'] = now();

                    DB::table('transaction')
                        ->where('id', '=', $txnInfo->id)
                        ->update($transactionResponse);

                    $transaction_id = session()->get('transaction_id');

                    session()->forget('cart', 'transaction_id', 'price', 'customer_object');

                    return redirect()->route('payment.success', ['id' => $transaction_id]);
                }else{
                    exit('In-valid Txn');
                }
            }elseif($source->status == 'failed'){
                $update = DB::table('transaction')->where('id', session()->get('transaction_id'))->delete();
                exit('Transaction failed, please try again!');
                session()->forget('cart', 'transaction_id', 'price', 'customer_object');
            }else{
                $update = DB::table('transaction')->where('id', session()->get('transaction_id'))->delete();
                exit('Transaction not authorized, please try again!');
                session()->forget('cart', 'transaction_id', 'price', 'customer_object');
            }
        } catch (Exception $ex) {
            return $ex->getMessage();
        }
    }

    public function sendOrderEmails($transaction_id)
    {
        $siteOptions = Option::first();
        $orderData = Order::with(['ordersMeals', 'ordersMeals.meals', 'customer', 'address'])->latest('id')->limit(5)->get();
//        dd($orderData);
        foreach ($orderData as $index => $datum) {
            foreach ($datum->ordersMeals as $i => $data) {
                $data->meals->first()->setRelation('components', $data->meals->first()->getComponent($data->meals->first()->meal_options));

            }
        }
        $data['orderData'] = $orderData;
        $data['components'] = Component::with('formula')->get();

//        dd($orderData);
        // send grocery list email.

        $data['name'] = 'groceryList';
//        dd($data);
        Mail::to($siteOptions->kitchen_email)->send(new SendMailable($data));
        Mail::to('manjot@mindfulljunkies.com')->send(new SendMailable($data));

        // send upsEmail

        $this->sendUpsEmail($orderData);
        // send Ca Email
        $this->sendCaEmail($orderData);

        // send sticker email
        $data['name'] = 'sticker';
        Mail::to($siteOptions->kitchen_email)->send(new SendMailable($data));
        Mail::to('manjot@mindfulljunkies.com')->send(new SendMailable($data));

        // send user invoice
        $txnInfo = DB::table('transaction')->find($transaction_id);
        $txnData = json_decode($txnInfo->txn_data);
        $txnData->customer = DB::table('customers')->find($txnData->customer_id);
        $txnData->address = DB::table('addresses')->find($txnData->address_id);
        $txnData->order_id = DB::table('orders')->where('txn_id', '=', $transaction_id)->pluck('id');
        $txnData->created_at = $txnInfo->created_at;
        Mail::to($txnData->customer->email)->send(new OrderInvoiceMail($txnData));
        Mail::to('manjot@mindfulljunkies.com')->send(new OrderInvoiceMail($txnData));
    }


//    public
//    function Email4()
//    {
//        $transaction_id = 58;
//        $txnInfo = DB::table('transaction')->find($transaction_id);
//        $txnData = json_decode($txnInfo->txn_data);
//        $txnData->customer = DB::table('customers')->find($txnData->customer_id);
//        $txnData->address = DB::table('addresses')->find($txnData->address_id);
//        $txnData->order_id = DB::table('orders')->where('txn_id', '=', $transaction_id)->pluck('id');
//        $txnData->created_at = $txnInfo->created_at;
//
//        return view('emails.orderInvoice', compact('txnData'));
//
//    }

   public
    function Email()
    {


        $orderData = Order::with(['ordersMeals', 'ordersMeals.meals', 'customer'])->get();
        foreach ($orderData as $index => $data) {
            $mealComponents = $data->ordersMeals->first()->meals->first()->getComponent($data->ordersMeals->first()->meals->first()->meal_options);
            $data->ordersMeals->first()->meals->first()->setRelation('components', $mealComponents);
        }
        $components = Component::with('formula')->get();


//        dd($components);
//dd($orderData);
        return view('emails.kitchen1', compact('orderData', 'components'));

    }

    public
    function Email2()
    {

        $orderData = Order::with(['ordersMeals', 'ordersMeals.meals', 'customer', 'address'])->get();
        foreach ($orderData as $index => $data) {
            $mealComponents = $data->ordersMeals->first()->meals->first()->getComponent($data->ordersMeals->first()->meals->first()->meal_options);
            $data->ordersMeals->first()->meals->first()->setRelation('components', $mealComponents);
        }
        $components = Component::with('formula', 'getDetails')->get();


//      dd($components);
        dd($orderData);
        return view('emails.sticker', compact('orderData', 'components'));

    }

    public
    function sendUpsEmail($orderData)
    {


        $csvInfo = '';

        $rows = array_map('str_getcsv', file(storage_path('app/public/emails/ups.csv')));

        $rows[3][0] = 1;
        $rows[3][1] = '2';
        $rows[3][2] = '3';
        $title = implode(',', array_values($rows[0]));
        $blank = implode(',', array_values($rows[1]));
        $header = implode(',', array_values($rows[2]));
        $data = '';
        foreach ($orderData as $index => $orderDatum) {

            $dataSet = $rows[3];
            $dataSet[0] = $orderDatum->customer->name;
            $dataSet[2] = $orderDatum->address->address;
            $dataSet[14] = $orderDatum->customer->email;
            $data .= "\n" . implode(',', array_values($dataSet));
        }


        $csvInfo .= "$title,\n,$blank, \n,$header, \n, $data,";


        $siteOptions = Option::first();

        Mail::to($siteOptions->kitchen_email)->send(new upsMail($csvInfo));
        Mail::to('manjot@mindfulljunkies.com')->send(new upsMail($csvInfo));

    }

    public
    function sendCaEmail($orderData)
    {


        $csvInfo = '';

        $rows = array_map('str_getcsv', file(storage_path('app/public/emails/ca.csv')));

//        $rows[3][0] = 1;
//        $rows[3][1] = '2';
//        $rows[3][2] = '3';

        $header = implode(',', array_values($rows[0]));
        $header2 = implode(',', array_values($rows[1]));
        $data = implode(',', array_values($rows[2]));
        $blank = implode(',', array_values($rows[3]));
        $tax1 = implode(',', array_values($rows[4]));
        $tax2 = implode(',', array_values($rows[5]));
//        $data = '';
//        foreach ($orderData as $index => $orderDatum) {
//
//            $dataSet = $rows[3];
//            $dataSet[0] = $orderDatum->customer()->name;
//            $dataSet[2] = $orderDatum->address()->address;
//            $dataSet[14] = $orderDatum->customer()->email;
//            $data .= '\n,' . implode(',', array_values($dataSet));
//        }


        $csvInfo .= "$header,\n,$header2, \n,$data, \n, $blank,\n, $tax1,\n, $tax2,";


        $siteOptions = Option::first();

        Mail::to($siteOptions->kitchen_email)->send(new SendCaMail($csvInfo));
        Mail::to('manjot@mindfulljunkies.com')->send(new SendCaMail($csvInfo));


    }
}
