<?php

namespace App\Http\Controllers\frontend;

use App\Coupon;
use App\Mail\SendMailable;
use App\Option;
use App\Address;
use Auth;
use App\Customer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;
use Notify;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Component;
use App\Meal;

use MyOnlineStore\Omnipay\KlarnaCheckout\Gateway;
use Omnipay\Omnipay;
use URL;


/**
 * Class HomeController
 * @package App\Http\Controllers
 */
class HomeController extends Controller
{
    /**
     *
     * Create a new controller instance.
     * @return void
     *
     */

    public function __construct()
    {

    }

    /**
     *
     * Display a listing of the resource.
     * @return \Illuminate\Http\Response
     *
     */

    public function index()
    {
        $components = Component::where('status', '1')->get();
        return view('frontend.home')->withComponents($components);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function mealsListing()
    {
        $meals = Meal::where('status', '1')->get();
        return view('frontend.mealListing')->withMeals($meals);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function mealSingle($slug)
    {
        $meal = Meal::where(['status' => '1', 'slug' => $slug])->first();
        if (empty($meal)) {
            return view('frontend._error');
        } else {
            $meals = Meal::where('status', '1')->where('id', '!=', $meal->id)->inRandomOrder()->limit(3)->get();
            return view('frontend.singleMeal')->withMeal($meal)->withMeals($meals);
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function cart()
    {

        $meals = $customMeal = 0;
        if (session()->has('cart')) {
            $cart = session('cart');
            $ids = array_keys($cart);
            $meals = Meal::whereIn('id', $ids)->get();
        }

        $siteOptions = Option::first();

        return view('frontend.cart')->withMeals($meals)->withCustomMeal($customMeal)->withSiteOptions($siteOptions);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request $request
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function updateCart(Request $request)
    {


        $siteOptions = Option::first();
        $mealId = $request->mealId;


        $cart = array();
        if ($request->has('qty')) {
            $qty = $request->qty;
            $price = $request->price;
            if ($mealId == 'custom') {
                $meal = new Meal;
                $meal->title = 'Individual meal';
                $meal->slug = str_slug('Individual meal' . rand());
                $meal->sku = rand(1, 10000);
                $meal->price = $price;
                $meal->status = '0';
                $meal->meal_options = json_encode(array(1 => $request->cmp));
                $meal->save();
                $mealId = $meal->id;
            }
            if (session()->has('cart')) {
                $cart = session('cart');
                if (array_key_exists($mealId, $cart)) {
                    $cart['total'] -= $cart[$mealId]['qty'] * $cart[$mealId]['price'];
                    $cart[$mealId]['price'] = $price;
                    $cart[$mealId]['qty'] = $qty;
                    $cart['total'] += $qty * $price;


                } else {
                    $cart[$mealId]['qty'] = $qty;
                    $cart[$mealId]['price'] = $price;
                    $cart['total'] += $qty * $price;
                }
            } else {
                $cart = array(
                    $mealId => array(
                        'qty' => $qty,
                        'price' => $price,
                    ),
                    'total' => $qty * $price,
                );
            }
            $meal = Meal::find($mealId);
            if ($meal->type == 2) {

                $grandTotal = number_format(($cart['total'] + ($cart['total'] * ($siteOptions->drink_vat_tax / 100)) + $siteOptions->shipping_tax +
                    ($siteOptions->shipping_tax * ($siteOptions->drink_vat_tax / 100))), 2);
            } else {
                $grandTotal = number_format(($cart['total'] + ($cart['total'] * ($siteOptions->vat_tax / 100)) + $siteOptions->shipping_tax +
                    ($siteOptions->shipping_tax * ($siteOptions->vat_tax / 100))), 2);
            }
            $cart['grandTotal'] = $grandTotal;
            session(['cart' => $cart]);

        } else {
            $cart = session('cart');
            if (array_key_exists($mealId, $cart)) {
                $total = $cart[$mealId]['qty'] * $cart[$mealId]['price'];
                $cart['total'] = (($cart['total'] - $total) >= 0) ? $cart['total'] - $total : 0;
                unset($cart[$mealId]);
            }
            session(['cart' => $cart]);
        }
//        unset($cart['total']);
//        unset($cart['grandTotal']);
        //print_r($cart);
        $meal = Meal::find($mealId);

        return response()->json(['status' => 200, 'count' => count(session('cart')) - 2, 'cart' => session('cart'), 'meal_type' => $meal->type]);
    }

    public function applyCoupon(Request $request)
    {
        if (Auth::guard('customer')->check()) {

            $userID = Auth::guard('customer')->user()->id;

        } else {

            return response()->json(['status' => 200, 'success' => '0', 'msg' => 'You must login to apply coupon']);

        }

        if ($request->coupon != '') {
            $couponDetail = Coupon::where('code', $request->coupon)->first();

            if ($couponDetail) {
                $couponUsed = Db::table('coupon_usage')
                    ->where('coupon_id', $couponDetail->id)
                    ->first();
                if ($couponUsed) {

                    return response()->json(['status' => 200, 'success' => '0', 'msg' => 'Coupon Already Used']);


                } else {

                    $cart = session('cart');

                    if ($couponDetail->created_at < date("Y-m-d")) {
                        if ($couponDetail->discount_type == 1) {

                            $newTotal = $cart['total'] - $couponDetail->discount;
                            $cart['coupon_discount'] = $couponDetail->discount;
                        } else {
                            $newTotal = $cart['total'] - ($cart['total'] / 100 * $couponDetail->discount);
                            $cart['coupon_discount'] = ($cart['total'] / 100 * $couponDetail->discount);
                        }

                        if ($newTotal < 0) {

                            return response()->json(['status' => 200, 'success' => '0', 'msg' => 'Unable to use this coupon. Minimum Cart value not available']);

                        }
                        $couponId = Db::table('coupon_usage')->
                        insertGetId(['coupon_id' => $couponDetail->id, 'used_by' => $userID, 'created_at' => date('Y-m-d')]);
                        $cart['total'] = $newTotal;
                        $cart['coupon'] = $couponId;
                        session(['cart' => $cart]);
                        return response()->json(['status' => 200, 'success' => '1']);

                        Notify::success('Coupon Applied successfully', 'Coupon');

                    } else {
                        return response()->json(['status' => 200, 'success' => '0', 'msg' => 'Coupon Expired']);
                    }
                }

            } else {
                return response()->json(['status' => 200, 'success' => '0', 'msg' => 'Invalid Coupon',]);

            }
        }


    }

    /**
     * Display the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function checkout()
    {
        if (!session()->has('cart')) {

            return redirect('/');
        } else {

            $cart = session('cart');

            if ($cart['grandTotal'] < 25) {
                Notify::info('Minimum Cart total', $title = 'Your cart must be greater then â‚¬ 25. current total is = ' . $cart['grandTotal']);
                return redirect('/cart');
            }
        }

        $addressList = [];
        if (Auth::guard('customer')->check()) {


            $addressList = Address::where('customer_id', Auth::guard('customer')->user()->id)->get();
//           dump($addressList);

        }
        $siteOptions = Option::first();
        return view('frontend.checkout')->withAddressList($addressList)->withsiteOptions($siteOptions);


    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function page($name)
    {


        return view("frontend.page.$name");

    }

    /**
     * show order invoice.
     *

     */
    public function invoice($id)
    {

        $txnInfo = DB::table('transaction')->find($id);

        $txnData = json_decode($txnInfo->txn_data);

        $txnData->customer = DB::table('customers')->find($txnData->customer_id);
        $txnData->address = DB::table('addresses')->find($txnData->address_id);
        $txnData->order_id = DB::table('orders')->where('txn_id', '=', $id)->pluck('id');
        $txnData->created_at = $txnInfo->created_at;

        return view('frontend.Invoice')->withData($txnData);
    }
   
    public function stripeinvoice()
    {

        $txnInfo = DB::table('transaction')->orderby('id','desc')->first();

        $txnData = json_decode($txnInfo->txn_data);
        
        foreach($txnData as $txnDatas){
            //echo $txnDatas->customer_id; die;
            $txnDatas->customer = DB::table('customers')->find($txnDatas->customer_id);
            $txnDatas->address = DB::table('addresses')->find($txnDatas->address_id);
            $txnDatas->order_id = DB::table('orders')->where('txn_id', '=', $txnInfo->id)->pluck('id');
            $txnDatas->created_at = $txnInfo->created_at;
        }
        

        return view('frontend.Invoice')->withData($txnDatas);
    }
}
